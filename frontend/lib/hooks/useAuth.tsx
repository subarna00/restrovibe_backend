'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from './redux'
import { useLoginMutation, useLogoutMutation, useGetMeQuery } from '@/lib/store/api/baseApi'
import { setCredentials, logout as logoutAction, setLoading } from '@/lib/store/slices/authSlice'

export function useAuth() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, tenant, restaurant, token, isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
  
  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()
  const { data: meData, isLoading: isMeLoading } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  })

  // Handle login
  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Starting login process...')
      const result = await loginMutation({ email, password }).unwrap()
      console.log('✅ Login API response:', result)
      
      // Extract data from the API response structure
      const { user, tenant, restaurant, access_token } = result.data
      console.log('📦 Extracted data:', { user, tenant, restaurant, access_token: access_token?.substring(0, 20) + '...' })
      
      // Store credentials in Redux store
      dispatch(setCredentials({
        user,
        tenant,
        restaurant,
        token: access_token
      }))
      
      console.log('✅ Credentials stored in Redux')
      return { success: true, user }
    } catch (error: any) {
      console.error('❌ Login error:', error)
      return { 
        success: false, 
        message: error.data?.message || 'Login failed' 
      }
    }
  }

  // Handle logout
  const logout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dispatch(logoutAction())
      router.push('/login')
    }
  }

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      const tenantData = localStorage.getItem('tenant_data')
      const restaurantData = localStorage.getItem('restaurant_data')

      if (token && userData && tenantData) {
        try {
          const user = JSON.parse(userData)
          const tenant = JSON.parse(tenantData)
          const restaurant = restaurantData ? JSON.parse(restaurantData) : null
          
          dispatch(setCredentials({ user, tenant, restaurant, token }))
        } catch (error) {
          console.error('Error parsing stored auth data:', error)
          localStorage.clear()
          dispatch(logoutAction())
        }
      } else {
        dispatch(setLoading(false))
      }
    }
  }, [dispatch])

  // Update local storage when auth state changes
  useEffect(() => {
    if (isAuthenticated && user && tenant && token) {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_data', JSON.stringify(user))
      localStorage.setItem('tenant_data', JSON.stringify(tenant))
      if (restaurant) {
        localStorage.setItem('restaurant_data', JSON.stringify(restaurant))
      }
    } else if (!isAuthenticated) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      localStorage.removeItem('tenant_data')
      localStorage.removeItem('restaurant_data')
    }
  }, [isAuthenticated, user, tenant, restaurant, token])

  return {
    user,
    tenant,
    restaurant,
    isAuthenticated,
    isLoading: isLoading || isLoginLoading || isMeLoading,
    login,
    logout,
    loginError,
  }
}
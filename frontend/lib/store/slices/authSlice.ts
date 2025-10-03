import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, Tenant, Restaurant } from '@/lib/types/api'

interface AuthState {
  user: User | null
  tenant: Tenant | null
  restaurant: Restaurant | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  tenant: null,
  restaurant: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{
      user: User
      tenant: Tenant
      restaurant?: Restaurant
      token: string
    }>) => {
      const { user, tenant, restaurant, token } = action.payload
      console.log('🔐 AuthSlice - Setting credentials:', { user: user.name, tenant: tenant.name, hasRestaurant: !!restaurant, hasToken: !!token })
      state.user = user
      state.tenant = tenant
      state.restaurant = restaurant || null
      state.token = token
      state.isAuthenticated = true
      state.isLoading = false
      console.log('🔐 AuthSlice - New state:', { isAuthenticated: state.isAuthenticated, isLoading: state.isLoading })
    },
    logout: (state) => {
      state.user = null
      state.tenant = null
      state.restaurant = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    updateTenant: (state, action: PayloadAction<Partial<Tenant>>) => {
      if (state.tenant) {
        state.tenant = { ...state.tenant, ...action.payload }
      }
    },
    updateRestaurant: (state, action: PayloadAction<Partial<Restaurant>>) => {
      if (state.restaurant) {
        state.restaurant = { ...state.restaurant, ...action.payload }
      }
    },
  },
})

export const {
  setCredentials,
  logout,
  setLoading,
  updateUser,
  updateTenant,
  updateRestaurant,
} = authSlice.actions

export default authSlice.reducer

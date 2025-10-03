'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Building2, Mail, Lock, User, Phone, MapPin } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    restaurant_name: '',
    restaurant_description: '',
    restaurant_address: '',
    restaurant_city: '',
    restaurant_state: '',
    restaurant_zip: '',
    restaurant_country: 'US',
    restaurant_phone: '',
    restaurant_website: '',
    restaurant_email: '',
    cuisine_type: '',
    price_range: '$$',
    delivery_available: false,
    max_delivery_distance: 10,
    subscription_plan: 'professional',
    timezone: 'America/New_York',
    currency: 'USD',
    language: 'en',
    terms_accepted: false,
    privacy_accepted: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { login, isLoading, loginError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match')
      return
    }

    if (!formData.terms_accepted || !formData.privacy_accepted) {
      setError('Please accept both the terms and conditions and privacy policy')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Registration successful! Please check your email for verification.')
        router.push('/login')
      } else {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat()
          setError(errorMessages.join(', '))
        } else {
          setError(data.message || 'Registration failed')
        }
        toast.error('Registration failed. Please check your information.')
      }
    } catch (err: any) {
      setError('Network error. Please try again.')
      toast.error('Registration failed. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">RestroVibe</h1>
            <p className="text-muted-foreground mt-2">Restaurant Management System</p>
          </div>
        </div>

        {/* Registration Card */}
        <Card className="card-elevated border-0 shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-4">
            <CardTitle className="text-2xl font-semibold">Create Your Account</CardTitle>
            <CardDescription className="text-base">
              Sign up to get started with RestroVibe
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-fade-in">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 h-11"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 h-11"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-11"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password_confirmation" className="text-sm font-medium">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-11"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Restaurant Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Restaurant Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant_name" className="text-sm font-medium">
                    Restaurant Name *
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="restaurant_name"
                      name="restaurant_name"
                      type="text"
                      placeholder="Enter restaurant name"
                      value={formData.restaurant_name}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restaurant_description" className="text-sm font-medium">
                    Restaurant Description
                  </Label>
                  <Textarea
                    id="restaurant_description"
                    name="restaurant_description"
                    placeholder="Tell customers about your restaurant..."
                    value={formData.restaurant_description}
                    onChange={handleInputChange}
                    className="min-h-[80px]"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restaurant_address" className="text-sm font-medium">
                    Restaurant Address *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="restaurant_address"
                      name="restaurant_address"
                      type="text"
                      placeholder="Enter restaurant address"
                      value={formData.restaurant_address}
                      onChange={handleInputChange}
                      className="pl-10 h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant_city" className="text-sm font-medium">
                      City *
                    </Label>
                    <Input
                      id="restaurant_city"
                      name="restaurant_city"
                      type="text"
                      placeholder="Enter city"
                      value={formData.restaurant_city}
                      onChange={handleInputChange}
                      className="h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="restaurant_state" className="text-sm font-medium">
                      State *
                    </Label>
                    <Input
                      id="restaurant_state"
                      name="restaurant_state"
                      type="text"
                      placeholder="Enter state"
                      value={formData.restaurant_state}
                      onChange={handleInputChange}
                      className="h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="restaurant_zip" className="text-sm font-medium">
                      ZIP Code *
                    </Label>
                    <Input
                      id="restaurant_zip"
                      name="restaurant_zip"
                      type="text"
                      placeholder="Enter ZIP code"
                      value={formData.restaurant_zip}
                      onChange={handleInputChange}
                      className="h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant_phone" className="text-sm font-medium">
                      Restaurant Phone *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="restaurant_phone"
                        name="restaurant_phone"
                        type="tel"
                        placeholder="Enter restaurant phone"
                        value={formData.restaurant_phone}
                        onChange={handleInputChange}
                        className="pl-10 h-11"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cuisine_type" className="text-sm font-medium">
                      Cuisine Type
                    </Label>
                    <Input
                      id="cuisine_type"
                      name="cuisine_type"
                      type="text"
                      placeholder="e.g., Italian, Chinese, Indian"
                      value={formData.cuisine_type}
                      onChange={handleInputChange}
                      className="h-11"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant_email" className="text-sm font-medium">
                      Restaurant Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="restaurant_email"
                        name="restaurant_email"
                        type="email"
                        placeholder="Enter restaurant email"
                        value={formData.restaurant_email}
                        onChange={handleInputChange}
                        className="pl-10 h-11"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="restaurant_website" className="text-sm font-medium">
                      Restaurant Website
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="restaurant_website"
                        name="restaurant_website"
                        type="url"
                        placeholder="https://your-restaurant.com"
                        value={formData.restaurant_website}
                        onChange={handleInputChange}
                        className="pl-10 h-11"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms_accepted"
                    name="terms_accepted"
                    checked={formData.terms_accepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, terms_accepted: !!checked }))
                    }
                    disabled={isLoading}
                  />
                  <Label 
                    htmlFor="terms_accepted" 
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:text-primary-dark">
                      Terms and Conditions
                    </Link>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy_accepted"
                    name="privacy_accepted"
                    checked={formData.privacy_accepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, privacy_accepted: !!checked }))
                    }
                    disabled={isLoading}
                  />
                  <Label 
                    htmlFor="privacy_accepted" 
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    I agree to the{' '}
                    <Link href="/privacy" className="text-primary hover:text-primary-dark">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium gradient-primary hover:opacity-90 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 RestroVibe. All rights reserved.</p>
          <p className="mt-1">Professional Restaurant Management Solution</p>
        </div>
      </div>
    </div>
  )
}

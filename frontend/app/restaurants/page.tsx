'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, Building2, MapPin, Phone, Mail, Clock, Globe, Plus, Search, Filter } from 'lucide-react'
import { useGetRestaurantsQuery, useCreateRestaurantMutation } from '@/lib/store/api/baseApi'

export default function RestaurantsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    opening_time: '09:00',
    closing_time: '22:00',
    cuisine_type: '',
    capacity: '',
    status: 'active'
  })

  const { data: restaurants, isLoading, error: fetchError } = useGetRestaurantsQuery()
  const [createRestaurant, { isLoading: isCreating }] = useCreateRestaurantMutation()

  const handleCreateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const restaurantData = {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        opening_time: formData.opening_time,
        closing_time: formData.closing_time,
      }

      await createRestaurant(restaurantData).unwrap()
      setIsCreateModalOpen(false)
      setFormData({
        name: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        opening_time: '09:00',
        closing_time: '22:00',
        cuisine_type: '',
        capacity: '',
        status: 'active'
      })
    } catch (err: any) {
      setError(err.data?.message || 'Failed to create restaurant')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const filteredRestaurants = restaurants?.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine_type?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Restaurants</h1>
            <p className="text-muted-foreground mt-2">
              Manage your restaurant locations and settings
            </p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary hover:opacity-90 transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                Create Restaurant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Create New Restaurant
                </DialogTitle>
                <DialogDescription>
                  Fill in the details about your restaurant to get started
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleCreateRestaurant} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="animate-fade-in">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Restaurant Name *
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter restaurant name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 h-11"
                          required
                          disabled={isCreating}
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
                        disabled={isCreating}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell customers about your restaurant..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className="min-h-[80px]"
                      disabled={isCreating}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter restaurant address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="pl-10 h-11"
                        required
                        disabled={isCreating}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 h-11"
                          disabled={isCreating}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 h-11"
                          disabled={isCreating}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">
                      Website
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://your-restaurant.com"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="pl-10 h-11"
                        disabled={isCreating}
                      />
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Operating Hours</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="opening_time" className="text-sm font-medium">
                        Opening Time
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="opening_time"
                          name="opening_time"
                          type="time"
                          value={formData.opening_time}
                          onChange={handleInputChange}
                          className="pl-10 h-11"
                          disabled={isCreating}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="closing_time" className="text-sm font-medium">
                        Closing Time
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="closing_time"
                          name="closing_time"
                          type="time"
                          value={formData.closing_time}
                          onChange={handleInputChange}
                          className="pl-10 h-11"
                          disabled={isCreating}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity" className="text-sm font-medium">
                        Seating Capacity
                      </Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        placeholder="e.g., 50"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="h-11"
                        disabled={isCreating}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="gradient-primary hover:opacity-90 transition-all duration-200"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Restaurant'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Restaurants Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Loading restaurants...</p>
            </div>
          </div>
        ) : fetchError ? (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load restaurants. Please try again.
            </AlertDescription>
          </Alert>
        ) : filteredRestaurants.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No restaurants match your search.' : 'Get started by creating your first restaurant.'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="gradient-primary hover:opacity-90 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Restaurant
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {restaurant.cuisine_type || 'Restaurant'}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={restaurant.status === 'active' ? 'default' : 'secondary'}>
                      {restaurant.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {restaurant.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {restaurant.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    {restaurant.address && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{restaurant.address}</span>
                      </div>
                    )}
                    
                    {restaurant.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{restaurant.phone}</span>
                      </div>
                    )}
                    
                    {restaurant.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{restaurant.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-sm text-muted-foreground">
                      {restaurant.capacity && `${restaurant.capacity} seats`}
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

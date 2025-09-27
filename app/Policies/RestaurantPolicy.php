<?php

namespace App\Policies;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RestaurantPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Super admin can view all restaurants
        if ($user->isSuperAdmin()) {
            return true;
        }
        
        // Tenant users can view restaurants in their tenant
        return $user->tenant_id !== null;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Restaurant $restaurant): bool
    {
        // Super admin can view any restaurant
        if ($user->isSuperAdmin()) {
            return true;
        }
        
        // Users can view restaurants in their tenant
        return $user->tenant_id === $restaurant->tenant_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Super admin can create restaurants
        if ($user->isSuperAdmin()) {
            return true;
        }
        
        // Restaurant owners can create restaurants in their tenant
        return $user->isRestaurantOwner() && $user->tenant_id !== null;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Restaurant $restaurant): bool
    {
        // Super admin can update any restaurant
        if ($user->isSuperAdmin()) {
            return true;
        }
        
        // Restaurant owners and managers can update restaurants in their tenant
        return $user->tenant_id === $restaurant->tenant_id && 
               ($user->isRestaurantOwner() || $user->isManager());
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Restaurant $restaurant): bool
    {
        // Super admin can delete any restaurant
        if ($user->isSuperAdmin()) {
            return true;
        }
        
        // Only restaurant owners can delete restaurants in their tenant
        return $user->tenant_id === $restaurant->tenant_id && $user->isRestaurantOwner();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Restaurant $restaurant): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Restaurant $restaurant): bool
    {
        return false;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\BelongsToTenant;

class Restaurant extends Model
{
    use HasFactory, SoftDeletes, BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'name',
        'slug',
        'description',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'phone',
        'email',
        'website',
        'logo',
        'cover_image',
        'cuisine_type',
        'price_range',
        'status',
        'settings',
        'business_hours',
        'delivery_zones',
    ];

    protected $casts = [
        'settings' => 'array',
        'business_hours' => 'array',
        'delivery_zones' => 'array',
    ];

    /**
     * Get the tenant that owns the restaurant
     */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Get all menu categories for this restaurant
     */
    public function menuCategories(): HasMany
    {
        return $this->hasMany(MenuCategory::class);
    }

    /**
     * Get all menu items for this restaurant
     */
    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }

    /**
     * Get all orders for this restaurant
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get all staff for this restaurant
     */
    public function staff(): HasMany
    {
        return $this->hasMany(User::class)->where('role', '!=', 'customer');
    }

    /**
     * Get all tables for this restaurant
     */
    public function tables(): HasMany
    {
        return $this->hasMany(Table::class);
    }

    /**
     * Get all table categories for this restaurant
     */
    public function tableCategories(): HasMany
    {
        return $this->hasMany(TableCategory::class);
    }

    /**
     * Check if restaurant is active
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    /**
     * Get full address
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->address}, {$this->city}, {$this->state} {$this->zip_code}, {$this->country}";
    }
}

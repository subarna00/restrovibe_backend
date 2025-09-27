<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\BelongsToTenant;

class MenuItem extends Model
{
    use HasFactory, SoftDeletes, BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'restaurant_id',
        'menu_category_id',
        'name',
        'slug',
        'description',
        'price',
        'cost_price',
        'image',
        'images',
        'is_available',
        'is_featured',
        'is_vegetarian',
        'is_vegan',
        'is_gluten_free',
        'is_spicy',
        'spice_level',
        'preparation_time',
        'calories',
        'allergens',
        'ingredients',
        'nutritional_info',
        'sort_order',
        'stock_quantity',
        'track_inventory',
        'min_stock_level',
        'variants',
        'settings',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'images' => 'array',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'is_vegetarian' => 'boolean',
        'is_vegan' => 'boolean',
        'is_gluten_free' => 'boolean',
        'is_spicy' => 'boolean',
        'spice_level' => 'integer',
        'preparation_time' => 'integer',
        'calories' => 'integer',
        'allergens' => 'array',
        'ingredients' => 'array',
        'nutritional_info' => 'array',
        'sort_order' => 'integer',
        'stock_quantity' => 'integer',
        'track_inventory' => 'boolean',
        'min_stock_level' => 'integer',
        'variants' => 'array',
        'settings' => 'array',
    ];

    /**
     * Get the tenant that owns the menu item
     */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Get the restaurant that owns the menu item
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the menu category that owns the menu item
     */
    public function menuCategory(): BelongsTo
    {
        return $this->belongsTo(MenuCategory::class);
    }

    /**
     * Check if menu item is available
     */
    public function isAvailable(): bool
    {
        return $this->is_available;
    }

    /**
     * Check if menu item is in stock
     */
    public function isInStock(): bool
    {
        if (!$this->track_inventory) {
            return true;
        }
        
        return $this->stock_quantity > 0;
    }

    /**
     * Check if menu item is low in stock
     */
    public function isLowStock(): bool
    {
        if (!$this->track_inventory || !$this->min_stock_level) {
            return false;
        }
        
        return $this->stock_quantity <= $this->min_stock_level;
    }

    /**
     * Get profit margin
     */
    public function getProfitMarginAttribute(): ?float
    {
        if (!$this->cost_price) {
            return null;
        }
        
        return (($this->price - $this->cost_price) / $this->price) * 100;
    }

    /**
     * Get formatted price
     */
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }
}

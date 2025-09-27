<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\BelongsToTenant;

class TableCategory extends Model
{
    use HasFactory, SoftDeletes, BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'restaurant_id',
        'name',
        'description',
        'floor',
        'section',
        'display_order',
        'is_active',
        'settings',
        'color',
        'icon',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_active' => 'boolean',
        'settings' => 'array',
    ];

    /**
     * Get the tenant that owns the table category
     */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Get the restaurant that owns the table category
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get all tables in this category
     */
    public function tables(): HasMany
    {
        return $this->hasMany(Table::class, 'category_id');
    }

    /**
     * Get active tables in this category
     */
    public function activeTables(): HasMany
    {
        return $this->hasMany(Table::class, 'category_id')
            ->where('status', '!=', 'out_of_service');
    }

    /**
     * Get available tables in this category
     */
    public function availableTables(): HasMany
    {
        return $this->hasMany(Table::class, 'category_id')
            ->where('status', 'available');
    }

    /**
     * Get occupied tables in this category
     */
    public function occupiedTables(): HasMany
    {
        return $this->hasMany(Table::class, 'category_id')
            ->where('status', 'occupied');
    }

    /**
     * Check if category is active
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Get category display name
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->name;
    }

    /**
     * Get category full identifier
     */
    public function getFullIdentifierAttribute(): string
    {
        $parts = [];
        
        if ($this->floor) {
            $parts[] = $this->floor;
        }
        
        if ($this->section) {
            $parts[] = $this->section;
        }
        
        $parts[] = $this->name;
        
        return implode(' - ', $parts);
    }

    /**
     * Get total capacity of all tables in this category
     */
    public function getTotalCapacityAttribute(): int
    {
        return $this->tables()->sum('capacity');
    }

    /**
     * Get available capacity of all tables in this category
     */
    public function getAvailableCapacityAttribute(): int
    {
        return $this->availableTables()->sum('capacity');
    }

    /**
     * Get table count in this category
     */
    public function getTableCountAttribute(): int
    {
        return $this->tables()->count();
    }

    /**
     * Get available table count in this category
     */
    public function getAvailableTableCountAttribute(): int
    {
        return $this->availableTables()->count();
    }

    /**
     * Get occupied table count in this category
     */
    public function getOccupiedTableCountAttribute(): int
    {
        return $this->occupiedTables()->count();
    }

    /**
     * Get utilization rate for this category
     */
    public function getUtilizationRateAttribute(): float
    {
        $totalTables = $this->table_count;
        $occupiedTables = $this->occupied_table_count;
        
        return $totalTables > 0 ? round(($occupiedTables / $totalTables) * 100, 2) : 0;
    }

    /**
     * Scope for active categories
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for categories by floor
     */
    public function scopeByFloor($query, $floor)
    {
        return $query->where('floor', $floor);
    }

    /**
     * Scope for categories by section
     */
    public function scopeBySection($query, $section)
    {
        return $query->where('section', $section);
    }

    /**
     * Scope for ordered categories
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('name');
    }

    /**
     * Get category statistics
     */
    public function getStats(): array
    {
        $tables = $this->tables();
        
        return [
            'total_tables' => $tables->count(),
            'available_tables' => $this->available_tables_count,
            'occupied_tables' => $this->occupied_tables_count,
            'reserved_tables' => $tables->where('status', 'reserved')->count(),
            'out_of_service_tables' => $tables->where('status', 'out_of_service')->count(),
            'cleaning_tables' => $tables->where('status', 'cleaning')->count(),
            'total_capacity' => $this->total_capacity,
            'available_capacity' => $this->available_capacity,
            'utilization_rate' => $this->utilization_rate,
        ];
    }

    /**
     * Get all possible category types (for suggestions)
     */
    public static function getCategoryTypeSuggestions(): array
    {
        return [
            'Ground Floor',
            'First Floor',
            'Second Floor',
            'Private Area',
            'VIP Section',
            'Outdoor Seating',
            'Bar Area',
            'Family Section',
            'Window Seating',
            'Corner Tables',
            'Main Hall',
            'Terrace',
            'Garden',
            'Rooftop',
            'Basement',
        ];
    }
}

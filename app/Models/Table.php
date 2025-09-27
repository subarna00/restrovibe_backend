<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\BelongsToTenant;

class Table extends Model
{
    use HasFactory, SoftDeletes, BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'restaurant_id',
        'category_id',
        'name',
        'number',
        'floor',
        'section',
        'capacity',
        'table_type',
        'status',
        'position_x',
        'position_y',
        'shape',
        'settings',
        'notes',
    ];

    protected $casts = [
        'capacity' => 'integer',
        'position_x' => 'decimal:2',
        'position_y' => 'decimal:2',
        'settings' => 'array',
    ];

    /**
     * Get the tenant that owns the table
     */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Get the restaurant that owns the table
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the category that owns the table
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(TableCategory::class);
    }

    /**
     * Get all orders for this table
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get active orders for this table
     */
    public function activeOrders(): HasMany
    {
        return $this->hasMany(Order::class)
            ->whereIn('status', ['pending', 'confirmed', 'preparing', 'ready']);
    }

    /**
     * Check if table is available
     */
    public function isAvailable(): bool
    {
        return $this->status === 'available';
    }

    /**
     * Check if table is occupied
     */
    public function isOccupied(): bool
    {
        return $this->status === 'occupied';
    }

    /**
     * Check if table is reserved
     */
    public function isReserved(): bool
    {
        return $this->status === 'reserved';
    }

    /**
     * Check if table is out of service
     */
    public function isOutOfService(): bool
    {
        return $this->status === 'out_of_service';
    }

    /**
     * Check if table is being cleaned
     */
    public function isCleaning(): bool
    {
        return $this->status === 'cleaning';
    }

    /**
     * Check if table can accept new orders
     */
    public function canAcceptOrders(): bool
    {
        return in_array($this->status, ['available', 'occupied']);
    }

    /**
     * Check if table is busy (occupied or reserved)
     */
    public function isBusy(): bool
    {
        return in_array($this->status, ['occupied', 'reserved']);
    }

    /**
     * Check if table is not available for seating
     */
    public function isNotAvailable(): bool
    {
        return in_array($this->status, ['out_of_service', 'cleaning']);
    }

    /**
     * Get table display name
     */
    public function getDisplayNameAttribute(): string
    {
        if ($this->floor && $this->floor !== 'Ground Floor') {
            return "{$this->name} ({$this->floor})";
        }
        
        return $this->name;
    }

    /**
     * Get table full identifier
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
     * Get table status color
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'available' => 'green',
            'occupied' => 'red',
            'reserved' => 'yellow',
            'out_of_service' => 'gray',
            'cleaning' => 'blue',
            default => 'gray'
        };
    }

    /**
     * Get table status display name
     */
    public function getStatusDisplayAttribute(): string
    {
        return match($this->status) {
            'available' => 'Available',
            'occupied' => 'Occupied',
            'reserved' => 'Reserved',
            'out_of_service' => 'Out of Service',
            'cleaning' => 'Cleaning',
            default => ucfirst($this->status)
        };
    }

    /**
     * Get all possible table statuses
     */
    public static function getStatuses(): array
    {
        return [
            'available' => 'Available',
            'occupied' => 'Occupied',
            'reserved' => 'Reserved',
            'out_of_service' => 'Out of Service',
            'cleaning' => 'Cleaning',
        ];
    }

    /**
     * Get all possible table types (for suggestions)
     */
    public static function getTableTypeSuggestions(): array
    {
        return [
            'Regular Table',
            'Booth',
            'Bar Table',
            'Outdoor Table',
            'Private Cabin',
            'VIP Table',
            'Family Table',
            'Counter',
            'High Top',
            'Communal Table',
            'Window Table',
            'Corner Table',
        ];
    }

    /**
     * Get table type display name
     */
    public function getTableTypeDisplayAttribute(): string
    {
        return $this->table_type ?: 'Regular Table';
    }

    /**
     * Scope for available tables
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Scope for occupied tables
     */
    public function scopeOccupied($query)
    {
        return $query->where('status', 'occupied');
    }

    /**
     * Scope for tables by floor
     */
    public function scopeByFloor($query, $floor)
    {
        return $query->where('floor', $floor);
    }

    /**
     * Scope for tables by section
     */
    public function scopeBySection($query, $section)
    {
        return $query->where('section', $section);
    }

    /**
     * Scope for tables by type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('table_type', $type);
    }

    /**
     * Scope for tables by category
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Scope for tables with minimum capacity
     */
    public function scopeWithMinCapacity($query, $capacity)
    {
        return $query->where('capacity', '>=', $capacity);
    }

    /**
     * Scope for tables that can accept orders
     */
    public function scopeCanAcceptOrders($query)
    {
        return $query->whereIn('status', ['available', 'occupied']);
    }

    /**
     * Scope for busy tables
     */
    public function scopeBusy($query)
    {
        return $query->whereIn('status', ['occupied', 'reserved']);
    }

    /**
     * Scope for tables not available for seating
     */
    public function scopeNotAvailable($query)
    {
        return $query->whereIn('status', ['out_of_service', 'cleaning']);
    }

    /**
     * Update table status
     */
    public function updateStatus(string $status): bool
    {
        $validStatuses = array_keys(self::getStatuses());
        
        if (!in_array($status, $validStatuses)) {
            return false;
        }
        
        return $this->update(['status' => $status]);
    }

    /**
     * Mark table as occupied
     */
    public function markAsOccupied(): bool
    {
        return $this->updateStatus('occupied');
    }

    /**
     * Mark table as available
     */
    public function markAsAvailable(): bool
    {
        return $this->updateStatus('available');
    }

    /**
     * Mark table as reserved
     */
    public function markAsReserved(): bool
    {
        return $this->updateStatus('reserved');
    }

    /**
     * Mark table as out of service
     */
    public function markAsOutOfService(): bool
    {
        return $this->updateStatus('out_of_service');
    }

    /**
     * Mark table as cleaning
     */
    public function markAsCleaning(): bool
    {
        return $this->updateStatus('cleaning');
    }
}

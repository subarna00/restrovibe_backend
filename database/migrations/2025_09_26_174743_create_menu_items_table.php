<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('cost_price', 10, 2)->nullable(); // For profit calculation
            $table->string('image')->nullable();
            $table->json('images')->nullable(); // Multiple images
            $table->boolean('is_available')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_vegetarian')->default(false);
            $table->boolean('is_vegan')->default(false);
            $table->boolean('is_gluten_free')->default(false);
            $table->boolean('is_spicy')->default(false);
            $table->integer('spice_level')->default(0); // 0-5 scale
            $table->integer('preparation_time')->nullable(); // in minutes
            $table->integer('calories')->nullable();
            $table->json('allergens')->nullable(); // Array of allergens
            $table->json('ingredients')->nullable(); // Array of ingredients
            $table->json('nutritional_info')->nullable(); // Nutritional information
            $table->integer('sort_order')->default(0);
            $table->integer('stock_quantity')->nullable(); // For inventory tracking
            $table->boolean('track_inventory')->default(false);
            $table->integer('min_stock_level')->nullable();
            $table->json('variants')->nullable(); // Size variants, add-ons, etc.
            $table->json('settings')->nullable(); // Additional settings
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['tenant_id', 'restaurant_id']);
            $table->index(['restaurant_id', 'menu_category_id']);
            $table->index(['restaurant_id', 'is_available']);
            $table->index(['restaurant_id', 'is_featured']);
            $table->index(['tenant_id', 'is_available']);
            $table->unique(['restaurant_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};

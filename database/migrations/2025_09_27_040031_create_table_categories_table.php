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
        Schema::create('table_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Category name (e.g., "Ground Floor", "Private Cabins")
            $table->text('description')->nullable(); // Category description
            $table->string('floor')->nullable(); // Floor (e.g., "Ground Floor", "First Floor")
            $table->string('section')->nullable(); // Section (e.g., "Main Hall", "Private Area")
            $table->integer('display_order')->default(0); // Order for display
            $table->boolean('is_active')->default(true); // Whether category is active
            $table->json('settings')->nullable(); // Additional settings
            $table->string('color')->nullable(); // Category color for UI
            $table->string('icon')->nullable(); // Category icon for UI
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better performance
            $table->index(['tenant_id', 'restaurant_id']);
            $table->index(['restaurant_id', 'is_active']);
            $table->index(['restaurant_id', 'floor']);
            $table->index(['restaurant_id', 'section']);
            $table->index(['restaurant_id', 'display_order']);
            
            // Unique constraint for category name within restaurant
            $table->unique(['restaurant_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_categories');
    }
};

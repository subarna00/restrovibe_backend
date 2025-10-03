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
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained('table_categories')->onDelete('set null');
            $table->string('name'); // Table name (e.g., "Table 1", "Booth A")
            $table->string('number')->nullable(); // Table number for identification
            $table->string('floor')->nullable(); // Floor (e.g., "Ground Floor", "First Floor")
            $table->string('section')->nullable(); // Section (e.g., "Main Hall", "Private Area")
            $table->integer('capacity')->default(2); // Number of people the table can seat
            $table->string('table_type')->nullable(); // Type of table (e.g., "Regular Table", "Booth", "Bar Table")
            $table->enum('status', ['available', 'occupied', 'reserved', 'out_of_service', 'cleaning'])->default('available');
            $table->decimal('position_x', 8, 2)->nullable(); // X position for floor plan
            $table->decimal('position_y', 8, 2)->nullable(); // Y position for floor plan
            $table->string('shape')->nullable(); // Table shape (e.g., "round", "square", "rectangular")
            $table->json('settings')->nullable(); // Additional settings
            $table->text('notes')->nullable(); // Additional notes
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better performance
            $table->index(['tenant_id', 'restaurant_id']);
            $table->index(['restaurant_id', 'status']);
            $table->index(['restaurant_id', 'floor']);
            $table->index(['restaurant_id', 'section']);
            $table->index(['restaurant_id', 'table_type']);
            $table->index(['restaurant_id', 'category_id']);
            $table->index(['restaurant_id', 'capacity']);
            
            // Unique constraint for table name within restaurant
            $table->unique(['restaurant_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};
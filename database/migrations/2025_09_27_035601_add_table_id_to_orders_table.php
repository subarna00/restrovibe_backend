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
        Schema::table('orders', function (Blueprint $table) {
            // Add foreign key constraint if it doesn't exist
            if (!Schema::hasColumn('orders', 'table_id')) {
                $table->foreignId('table_id')->nullable()->constrained('tables')->onDelete('set null');
            } else {
                // Column exists, just add the foreign key constraint
                $table->foreign('table_id')->references('id')->on('tables')->onDelete('set null');
            }
            $table->index(['restaurant_id', 'table_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['table_id']);
            $table->dropIndex(['restaurant_id', 'table_id']);
            $table->dropColumn('table_id');
        });
    }
};

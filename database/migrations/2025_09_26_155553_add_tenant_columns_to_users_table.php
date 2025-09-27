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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('tenant_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('restaurant_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('role', ['super_admin', 'restaurant_owner', 'manager', 'staff', 'customer'])->default('customer');
            $table->string('phone')->nullable();
            $table->string('avatar')->nullable();
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->timestamp('last_login_at')->nullable();
            $table->json('permissions')->nullable();

            $table->index(['tenant_id', 'role']);
            $table->index(['restaurant_id', 'role']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['tenant_id']);
            $table->dropForeign(['restaurant_id']);
            $table->dropColumn([
                'tenant_id',
                'restaurant_id',
                'role',
                'phone',
                'avatar',
                'status',
                'last_login_at',
                'permissions'
            ]);
        });
    }
};

<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🌱 Starting comprehensive database seeding...');
        
        $this->call([
            // Core data first
            ComprehensiveSeeder::class,        // Creates tenants, restaurants, and users
            TableCategorySeeder::class,        // Creates table categories
            TableSeeder::class,                // Creates tables
            MenuDataSeeder::class,             // Creates menu categories and items
            MenuImageSeeder::class,            // Sets up menu images
            OrderSeeder::class,                // Creates realistic order data
        ]);
        
        $this->command->info('✅ Database seeding completed successfully!');
        $this->command->info('📊 Summary:');
        $this->command->info('   - 2 Tenants with 4 Restaurants');
        $this->command->info('   - 20+ Users across all roles');
        $this->command->info('   - 6 Table Categories per restaurant');
        $this->command->info('   - 20+ Tables per restaurant');
        $this->command->info('   - Complete menus with realistic items');
        $this->command->info('   - 30 days of realistic order history');
        $this->command->info('');
        $this->command->info('🔑 Login Credentials:');
        $this->command->info('   Super Admin: admin@restrovibe.com / password');
        $this->command->info('   Restaurant Owners: Check ComprehensiveSeeder for details');
        $this->command->info('   All passwords: password');
    }
}

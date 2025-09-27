<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tenant;
use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Hash;

class TenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create super admin user first
        $superAdmin = User::create([
            'name' => 'Super Administrator',
            'email' => 'admin@restrovibe.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create demo tenant
        $tenant = Tenant::create([
            'name' => 'Demo Restaurant Group',
            'slug' => 'demo-restaurant-group',
            'domain' => 'demo.restrovibe.com',
            'status' => 'active',
            'subscription_plan' => 'professional',
            'subscription_status' => 'active',
            'subscription_expires_at' => now()->addYear(),
            'settings' => [
                'timezone' => 'America/New_York',
                'currency' => 'USD',
                'language' => 'en',
            ],
            'primary_color' => '#3B82F6',
            'secondary_color' => '#1E40AF',
        ]);

        // Create restaurant owner
        $owner = User::create([
            'tenant_id' => $tenant->id,
            'name' => 'John Restaurant Owner',
            'email' => 'owner@demo-restaurant.com',
            'password' => Hash::make('password'),
            'role' => 'restaurant_owner',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create demo restaurant
        $restaurant = Restaurant::create([
            'tenant_id' => $tenant->id,
            'name' => 'Demo Italian Bistro',
            'slug' => 'demo-italian-bistro',
            'description' => 'Authentic Italian cuisine in the heart of the city',
            'address' => '123 Main Street',
            'city' => 'New York',
            'state' => 'NY',
            'zip_code' => '10001',
            'country' => 'US',
            'phone' => '+1 (555) 123-4567',
            'email' => 'info@demo-italian-bistro.com',
            'website' => 'https://demo-italian-bistro.com',
            'cuisine_type' => 'Italian',
            'price_range' => '$$',
            'status' => 'active',
            'business_hours' => [
                'monday' => ['open' => '09:00', 'close' => '22:00'],
                'tuesday' => ['open' => '09:00', 'close' => '22:00'],
                'wednesday' => ['open' => '09:00', 'close' => '22:00'],
                'thursday' => ['open' => '09:00', 'close' => '22:00'],
                'friday' => ['open' => '09:00', 'close' => '23:00'],
                'saturday' => ['open' => '10:00', 'close' => '23:00'],
                'sunday' => ['open' => '10:00', 'close' => '21:00'],
            ],
            'settings' => [
                'accepts_online_orders' => true,
                'delivery_available' => true,
                'pickup_available' => true,
                'max_delivery_distance' => 10,
            ],
        ]);

        // Update owner with restaurant_id
        $owner->update(['restaurant_id' => $restaurant->id]);

        // Create manager
        $manager = User::create([
            'tenant_id' => $tenant->id,
            'restaurant_id' => $restaurant->id,
            'name' => 'Jane Manager',
            'email' => 'manager@demo-restaurant.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'manage_menu',
                'manage_orders',
                'manage_staff',
                'view_reports',
            ],
        ]);

        // Create staff member
        $staff = User::create([
            'tenant_id' => $tenant->id,
            'restaurant_id' => $restaurant->id,
            'name' => 'Bob Staff',
            'email' => 'staff@demo-restaurant.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'manage_orders',
                'view_menu',
            ],
        ]);

        $this->command->info('Demo tenant and users created successfully!');
        $this->command->info('Super Admin: admin@restrovibe.com / password');
        $this->command->info('Restaurant Owner: owner@demo-restaurant.com / password');
        $this->command->info('Manager: manager@demo-restaurant.com / password');
        $this->command->info('Staff: staff@demo-restaurant.com / password');
    }
}

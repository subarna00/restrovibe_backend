<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Tenant;
use App\Models\Restaurant;
use App\Models\User;

/**
 * RestroVibe Demo Data Seeder
 * 
 * Creates comprehensive test data for the RestroVibe Restaurant Management System:
 * - 1 Super Admin (global system administrator)
 * - 2 Tenants with different subscription plans (Enterprise & Professional)
 * - 4 Restaurants with diverse cuisines and business models
 * - 21 Users across all roles (Super Admin, Restaurant Owner, Manager, Staff, Customer)
 * 
 * This seeder provides realistic test data for:
 * - Multi-tenancy testing
 * - Role-based access control
 * - Authentication flows
 * - Restaurant management features
 * - API endpoint testing
 */
class RestroVibeDemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🌱 Starting RestroVibe demo data seeding...');

        // Create Super Admin (global)
        $this->createSuperAdmin();

        // Create Tenants
        $tenant1 = $this->createTenant1();
        $tenant2 = $this->createTenant2();

        // Create Restaurants for Tenant 1
        $restaurant1_1 = $this->createRestaurant1_1($tenant1);
        $restaurant1_2 = $this->createRestaurant1_2($tenant1);

        // Create Restaurants for Tenant 2
        $restaurant2_1 = $this->createRestaurant2_1($tenant2);
        $restaurant2_2 = $this->createRestaurant2_2($tenant2);

        // Create Users for each restaurant
        $this->createUsersForRestaurant($restaurant1_1, 'Italian Bistro');
        $this->createUsersForRestaurant($restaurant1_2, 'Pizza Palace');
        $this->createUsersForRestaurant($restaurant2_1, 'Sushi Master');
        $this->createUsersForRestaurant($restaurant2_2, 'Burger Joint');

        $this->command->info('✅ RestroVibe demo data seeding completed successfully!');
        $this->command->info('📊 Summary:');
        $this->command->info('   - 1 Super Admin');
        $this->command->info('   - 2 Tenants');
        $this->command->info('   - 4 Restaurants');
        $this->command->info('   - 20 Users (5 roles × 4 restaurants)');
    }

    /**
     * Create Super Admin
     */
    private function createSuperAdmin(): void
    {
        $this->command->info('👑 Creating Super Admin...');

        User::create([
            'name' => 'Super Administrator',
            'email' => 'admin@restrovibe.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'manage_tenants',
                'view_analytics',
                'manage_system',
                'switch_tenants',
            ],
        ]);

        $this->command->info('   ✅ Super Admin created: admin@restrovibe.com');
    }

    /**
     * Create Tenant 1 - Premium Restaurant Group
     */
    private function createTenant1(): Tenant
    {
        $this->command->info('🏢 Creating Tenant 1 - Premium Restaurant Group...');

        $tenant = Tenant::create([
            'name' => 'Premium Restaurant Group',
            'slug' => 'premium-restaurant-group',
            'domain' => 'premium.restrovibe.com',
            'status' => 'active',
            'subscription_plan' => 'enterprise',
            'subscription_status' => 'active',
            'subscription_expires_at' => now()->addYear(),
            'settings' => [
                'timezone' => 'America/New_York',
                'currency' => 'USD',
                'language' => 'en',
                'features' => [
                    'multi_location' => true,
                    'advanced_analytics' => true,
                    'white_label' => true,
                    'priority_support' => true,
                ],
            ],
            'primary_color' => '#1E40AF',
            'secondary_color' => '#3B82F6',
        ]);

        $this->command->info('   ✅ Tenant 1 created: Premium Restaurant Group');
        return $tenant;
    }

    /**
     * Create Tenant 2 - Local Eateries
     */
    private function createTenant2(): Tenant
    {
        $this->command->info('🏢 Creating Tenant 2 - Local Eateries...');

        $tenant = Tenant::create([
            'name' => 'Local Eateries',
            'slug' => 'local-eateries',
            'domain' => 'local.restrovibe.com',
            'status' => 'active',
            'subscription_plan' => 'professional',
            'subscription_status' => 'active',
            'subscription_expires_at' => now()->addMonths(6),
            'settings' => [
                'timezone' => 'America/Los_Angeles',
                'currency' => 'USD',
                'language' => 'en',
                'features' => [
                    'multi_location' => false,
                    'advanced_analytics' => true,
                    'white_label' => false,
                    'priority_support' => false,
                ],
            ],
            'primary_color' => '#059669',
            'secondary_color' => '#10B981',
        ]);

        $this->command->info('   ✅ Tenant 2 created: Local Eateries');
        return $tenant;
    }

    /**
     * Create Restaurant 1.1 - Italian Bistro
     */
    private function createRestaurant1_1(Tenant $tenant): Restaurant
    {
        $this->command->info('🍝 Creating Restaurant 1.1 - Italian Bistro...');

        $restaurant = Restaurant::create([
            'tenant_id' => $tenant->id,
            'name' => 'Bella Vista Italian Bistro',
            'slug' => 'bella-vista-italian-bistro',
            'description' => 'Authentic Italian cuisine with a modern twist, featuring fresh pasta, wood-fired pizzas, and an extensive wine selection.',
            'address' => '123 Little Italy Street',
            'city' => 'New York',
            'state' => 'NY',
            'zip_code' => '10013',
            'country' => 'US',
            'phone' => '+1 (555) 123-4567',
            'email' => 'info@bellavista.com',
            'website' => 'https://bellavista.com',
            'cuisine_type' => 'Italian',
            'price_range' => '$$$',
            'status' => 'active',
            'business_hours' => [
                'monday' => ['open' => '11:00', 'close' => '22:00'],
                'tuesday' => ['open' => '11:00', 'close' => '22:00'],
                'wednesday' => ['open' => '11:00', 'close' => '22:00'],
                'thursday' => ['open' => '11:00', 'close' => '23:00'],
                'friday' => ['open' => '11:00', 'close' => '23:00'],
                'saturday' => ['open' => '10:00', 'close' => '23:00'],
                'sunday' => ['open' => '10:00', 'close' => '21:00'],
            ],
            'settings' => [
                'accepts_online_orders' => true,
                'delivery_available' => true,
                'pickup_available' => true,
                'max_delivery_distance' => 15,
                'minimum_order_amount' => 25.00,
                'delivery_fee' => 4.99,
                'tax_rate' => 0.08,
                'service_fee' => 0.05,
                'auto_accept_orders' => false,
                'require_phone_verification' => true,
            ],
        ]);

        $this->command->info('   ✅ Restaurant 1.1 created: Bella Vista Italian Bistro');
        return $restaurant;
    }

    /**
     * Create Restaurant 1.2 - Pizza Palace
     */
    private function createRestaurant1_2(Tenant $tenant): Restaurant
    {
        $this->command->info('🍕 Creating Restaurant 1.2 - Pizza Palace...');

        $restaurant = Restaurant::create([
            'tenant_id' => $tenant->id,
            'name' => 'Mario\'s Pizza Palace',
            'slug' => 'marios-pizza-palace',
            'description' => 'New York style pizza with fresh ingredients, traditional recipes, and fast delivery service.',
            'address' => '456 Broadway',
            'city' => 'New York',
            'state' => 'NY',
            'zip_code' => '10018',
            'country' => 'US',
            'phone' => '+1 (555) 234-5678',
            'email' => 'orders@mariospizza.com',
            'website' => 'https://mariospizza.com',
            'cuisine_type' => 'Pizza',
            'price_range' => '$$',
            'status' => 'active',
            'business_hours' => [
                'monday' => ['open' => '10:00', 'close' => '23:00'],
                'tuesday' => ['open' => '10:00', 'close' => '23:00'],
                'wednesday' => ['open' => '10:00', 'close' => '23:00'],
                'thursday' => ['open' => '10:00', 'close' => '24:00'],
                'friday' => ['open' => '10:00', 'close' => '24:00'],
                'saturday' => ['open' => '10:00', 'close' => '24:00'],
                'sunday' => ['open' => '11:00', 'close' => '22:00'],
            ],
            'settings' => [
                'accepts_online_orders' => true,
                'delivery_available' => true,
                'pickup_available' => true,
                'max_delivery_distance' => 20,
                'minimum_order_amount' => 15.00,
                'delivery_fee' => 2.99,
                'tax_rate' => 0.08,
                'service_fee' => 0.03,
                'auto_accept_orders' => true,
                'require_phone_verification' => false,
            ],
        ]);

        $this->command->info('   ✅ Restaurant 1.2 created: Mario\'s Pizza Palace');
        return $restaurant;
    }

    /**
     * Create Restaurant 2.1 - Sushi Master
     */
    private function createRestaurant2_1(Tenant $tenant): Restaurant
    {
        $this->command->info('🍣 Creating Restaurant 2.1 - Sushi Master...');

        $restaurant = Restaurant::create([
            'tenant_id' => $tenant->id,
            'name' => 'Sakura Sushi Master',
            'slug' => 'sakura-sushi-master',
            'description' => 'Premium Japanese sushi and sashimi with traditional techniques and the freshest fish.',
            'address' => '789 Sunset Boulevard',
            'city' => 'Los Angeles',
            'state' => 'CA',
            'zip_code' => '90028',
            'country' => 'US',
            'phone' => '+1 (555) 345-6789',
            'email' => 'reservations@sakurasushi.com',
            'website' => 'https://sakurasushi.com',
            'cuisine_type' => 'Japanese',
            'price_range' => '$$$$',
            'status' => 'active',
            'business_hours' => [
                'monday' => ['open' => '17:00', 'close' => '22:00'],
                'tuesday' => ['open' => '17:00', 'close' => '22:00'],
                'wednesday' => ['open' => '17:00', 'close' => '22:00'],
                'thursday' => ['open' => '17:00', 'close' => '23:00'],
                'friday' => ['open' => '17:00', 'close' => '23:00'],
                'saturday' => ['open' => '17:00', 'close' => '23:00'],
                'sunday' => ['open' => '17:00', 'close' => '21:00'],
            ],
            'settings' => [
                'accepts_online_orders' => true,
                'delivery_available' => false,
                'pickup_available' => true,
                'max_delivery_distance' => 0,
                'minimum_order_amount' => 50.00,
                'delivery_fee' => 0,
                'tax_rate' => 0.10,
                'service_fee' => 0.08,
                'auto_accept_orders' => false,
                'require_phone_verification' => true,
            ],
        ]);

        $this->command->info('   ✅ Restaurant 2.1 created: Sakura Sushi Master');
        return $restaurant;
    }

    /**
     * Create Restaurant 2.2 - Burger Joint
     */
    private function createRestaurant2_2(Tenant $tenant): Restaurant
    {
        $this->command->info('🍔 Creating Restaurant 2.2 - Burger Joint...');

        $restaurant = Restaurant::create([
            'tenant_id' => $tenant->id,
            'name' => 'Golden State Burger Co.',
            'slug' => 'golden-state-burger-co',
            'description' => 'Gourmet burgers made with locally sourced ingredients, craft beers, and a casual dining atmosphere.',
            'address' => '321 Hollywood Boulevard',
            'city' => 'Los Angeles',
            'state' => 'CA',
            'zip_code' => '90028',
            'country' => 'US',
            'phone' => '+1 (555) 456-7890',
            'email' => 'hello@goldenstateburger.com',
            'website' => 'https://goldenstateburger.com',
            'cuisine_type' => 'American',
            'price_range' => '$$',
            'status' => 'active',
            'business_hours' => [
                'monday' => ['open' => '11:00', 'close' => '22:00'],
                'tuesday' => ['open' => '11:00', 'close' => '22:00'],
                'wednesday' => ['open' => '11:00', 'close' => '22:00'],
                'thursday' => ['open' => '11:00', 'close' => '23:00'],
                'friday' => ['open' => '11:00', 'close' => '23:00'],
                'saturday' => ['open' => '10:00', 'close' => '23:00'],
                'sunday' => ['open' => '10:00', 'close' => '22:00'],
            ],
            'settings' => [
                'accepts_online_orders' => true,
                'delivery_available' => true,
                'pickup_available' => true,
                'max_delivery_distance' => 12,
                'minimum_order_amount' => 20.00,
                'delivery_fee' => 3.99,
                'tax_rate' => 0.10,
                'service_fee' => 0.04,
                'auto_accept_orders' => true,
                'require_phone_verification' => false,
            ],
        ]);

        $this->command->info('   ✅ Restaurant 2.2 created: Golden State Burger Co.');
        return $restaurant;
    }

    /**
     * Create all user roles for a restaurant
     */
    private function createUsersForRestaurant(Restaurant $restaurant, string $restaurantName): void
    {
        $this->command->info("👥 Creating users for {$restaurantName}...");

        // Restaurant Owner
        User::create([
            'tenant_id' => $restaurant->tenant_id,
            'restaurant_id' => $restaurant->id,
            'name' => $this->getOwnerName($restaurantName),
            'email' => $this->getOwnerEmail($restaurantName),
            'password' => Hash::make('password'),
            'role' => 'restaurant_owner',
            'phone' => $this->getPhoneNumber(),
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'manage_restaurant',
                'manage_menu',
                'manage_orders',
                'manage_staff',
                'manage_inventory',
                'view_reports',
                'manage_settings',
                'manage_subscription',
            ],
        ]);

        // Manager
        User::create([
            'tenant_id' => $restaurant->tenant_id,
            'restaurant_id' => $restaurant->id,
            'name' => $this->getManagerName($restaurantName),
            'email' => $this->getManagerEmail($restaurantName),
            'password' => Hash::make('password'),
            'role' => 'manager',
            'phone' => $this->getPhoneNumber(),
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'manage_menu',
                'manage_orders',
                'manage_staff',
                'manage_inventory',
                'view_reports',
                'manage_settings',
            ],
        ]);

        // Staff Member 1
        User::create([
            'tenant_id' => $restaurant->tenant_id,
            'restaurant_id' => $restaurant->id,
            'name' => $this->getStaffName($restaurantName, 1),
            'email' => $this->getStaffEmail($restaurantName, 1),
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => $this->getPhoneNumber(),
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'manage_orders',
                'view_menu',
                'manage_inventory',
            ],
        ]);

        // Staff Member 2
        User::create([
            'tenant_id' => $restaurant->tenant_id,
            'restaurant_id' => $restaurant->id,
            'name' => $this->getStaffName($restaurantName, 2),
            'email' => $this->getStaffEmail($restaurantName, 2),
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => $this->getPhoneNumber(),
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'manage_orders',
                'view_menu',
                'manage_inventory',
            ],
        ]);

        // Customer
        User::create([
            'tenant_id' => $restaurant->tenant_id,
            'restaurant_id' => $restaurant->id,
            'name' => $this->getCustomerName($restaurantName),
            'email' => $this->getCustomerEmail($restaurantName),
            'password' => Hash::make('password'),
            'role' => 'customer',
            'phone' => $this->getPhoneNumber(),
            'status' => 'active',
            'email_verified_at' => now(),
            'permissions' => [
                'place_orders',
                'view_menu',
                'manage_profile',
            ],
        ]);

        $this->command->info("   ✅ 5 users created for {$restaurantName}");
    }

    /**
     * Helper methods for generating names and emails
     */
    private function getOwnerName(string $restaurantName): string
    {
        $names = [
            'Italian Bistro' => 'Marco Rossi',
            'Pizza Palace' => 'Giuseppe Romano',
            'Sushi Master' => 'Hiroshi Tanaka',
            'Burger Joint' => 'Michael Johnson',
        ];
        return $names[$restaurantName] ?? 'Restaurant Owner';
    }

    private function getOwnerEmail(string $restaurantName): string
    {
        $emails = [
            'Italian Bistro' => 'marco@bellavista.com',
            'Pizza Palace' => 'giuseppe@mariospizza.com',
            'Sushi Master' => 'hiroshi@sakurasushi.com',
            'Burger Joint' => 'michael@goldenstateburger.com',
        ];
        return $emails[$restaurantName] ?? 'owner@restaurant.com';
    }

    private function getManagerName(string $restaurantName): string
    {
        $names = [
            'Italian Bistro' => 'Sofia Bianchi',
            'Pizza Palace' => 'Antonio Ferrari',
            'Sushi Master' => 'Yuki Nakamura',
            'Burger Joint' => 'Sarah Williams',
        ];
        return $names[$restaurantName] ?? 'Restaurant Manager';
    }

    private function getManagerEmail(string $restaurantName): string
    {
        $emails = [
            'Italian Bistro' => 'sofia@bellavista.com',
            'Pizza Palace' => 'antonio@mariospizza.com',
            'Sushi Master' => 'yuki@sakurasushi.com',
            'Burger Joint' => 'sarah@goldenstateburger.com',
        ];
        return $emails[$restaurantName] ?? 'manager@restaurant.com';
    }

    private function getStaffName(string $restaurantName, int $number): string
    {
        $names = [
            'Italian Bistro' => ['Luca Conti', 'Elena Moretti'],
            'Pizza Palace' => ['Francesco Lombardi', 'Giulia Ricci'],
            'Sushi Master' => ['Kenji Sato', 'Aiko Yamamoto'],
            'Burger Joint' => ['David Brown', 'Lisa Davis'],
        ];
        return $names[$restaurantName][$number - 1] ?? "Staff Member {$number}";
    }

    private function getStaffEmail(string $restaurantName, int $number): string
    {
        $emails = [
            'Italian Bistro' => ['luca@bellavista.com', 'elena@bellavista.com'],
            'Pizza Palace' => ['francesco@mariospizza.com', 'giulia@mariospizza.com'],
            'Sushi Master' => ['kenji@sakurasushi.com', 'aiko@sakurasushi.com'],
            'Burger Joint' => ['david@goldenstateburger.com', 'lisa@goldenstateburger.com'],
        ];
        return $emails[$restaurantName][$number - 1] ?? "staff{$number}@restaurant.com";
    }

    private function getCustomerName(string $restaurantName): string
    {
        $names = [
            'Italian Bistro' => 'Robert Smith',
            'Pizza Palace' => 'Jennifer Wilson',
            'Sushi Master' => 'James Chen',
            'Burger Joint' => 'Emily Rodriguez',
        ];
        return $names[$restaurantName] ?? 'Regular Customer';
    }

    private function getCustomerEmail(string $restaurantName): string
    {
        $emails = [
            'Italian Bistro' => 'robert@customer.com',
            'Pizza Palace' => 'jennifer@customer.com',
            'Sushi Master' => 'james@customer.com',
            'Burger Joint' => 'emily@customer.com',
        ];
        return $emails[$restaurantName] ?? 'customer@restaurant.com';
    }

    private function getPhoneNumber(): string
    {
        return '+1 (555) ' . rand(100, 999) . '-' . rand(1000, 9999);
    }
}

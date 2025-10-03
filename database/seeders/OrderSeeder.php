<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Restaurant;
use App\Models\Table;
use App\Models\MenuItem;
use App\Models\User;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🍽️ Creating realistic order data...');

        $restaurants = Restaurant::all();

        foreach ($restaurants as $restaurant) {
            $this->command->info("Creating orders for restaurant: {$restaurant->name}");
            $this->createOrdersForRestaurant($restaurant);
        }

        $this->command->info('✅ Order data created successfully!');
    }

    /**
     * Create realistic orders for a restaurant
     */
    private function createOrdersForRestaurant(Restaurant $restaurant): void
    {
        $tables = $restaurant->tables;
        $menuItems = $restaurant->menuItems;
        $customers = User::where('restaurant_id', $restaurant->id)
            ->where('role', 'customer')
            ->get();

        if ($tables->isEmpty() || $menuItems->isEmpty() || $customers->isEmpty()) {
            $this->command->warn("Skipping orders for {$restaurant->name} - missing tables, menu items, or customers");
            return;
        }

        // Create orders for the last 7 days
        for ($i = 0; $i < 7; $i++) {
            $date = Carbon::now()->subDays($i);
            
            // Create 2-5 orders per day (more on weekends)
            $ordersPerDay = $date->isWeekend() ? rand(4, 8) : rand(2, 5);
            
            for ($j = 0; $j < $ordersPerDay; $j++) {
                $this->createOrder($restaurant, $tables, $menuItems, $customers, $date);
            }
        }

        // Create some current day orders with different statuses
        $this->createCurrentDayOrders($restaurant, $tables, $menuItems, $customers);
    }

    /**
     * Create a single order
     */
    private function createOrder(Restaurant $restaurant, $tables, $menuItems, $customers, Carbon $date): void
    {
        $table = $tables->random();
        $customer = $customers->random();
        
        // Random order time within business hours
        $orderTime = $this->getRandomOrderTime($date, $restaurant);
        
        // Determine order status based on time
        $status = $this->getOrderStatus($orderTime);
        
        $order = Order::create([
            'tenant_id' => $restaurant->tenant_id,
            'restaurant_id' => $restaurant->id,
            'table_id' => $table->id,
            'customer_id' => $customer->id,
            'order_number' => $this->generateOrderNumber($restaurant),
            'status' => $status,
            'payment_status' => $this->getPaymentStatus($status),
            'payment_method' => $this->getRandomPaymentMethod(),
            'subtotal' => 0, // Will be calculated
            'tax_amount' => 0, // Will be calculated
            'delivery_fee' => 0,
            'total_amount' => 0, // Will be calculated
            'notes' => $this->getRandomOrderNotes(),
            'delivered_at' => $status === 'delivered' ? $orderTime->addMinutes(rand(15, 45)) : null,
            'cancelled_at' => $status === 'cancelled' ? $orderTime->addMinutes(rand(5, 20)) : null,
            'cancellation_reason' => $status === 'cancelled' ? $this->getRandomCancellationReason() : null,
            'created_at' => $orderTime,
            'updated_at' => $orderTime,
        ]);

        // Create order items
        $this->createOrderItems($order, $menuItems);
        
        // Update order totals
        $this->updateOrderTotals($order);
    }

    /**
     * Create current day orders with various statuses
     */
    private function createCurrentDayOrders(Restaurant $restaurant, $tables, $menuItems, $customers): void
    {
        $today = Carbon::today();
        
        // Pending order
        $this->createOrderWithStatus($restaurant, $tables, $menuItems, $customers, $today, 'pending');
        
        // Confirmed order
        $this->createOrderWithStatus($restaurant, $tables, $menuItems, $customers, $today, 'confirmed');
        
        // Preparing order
        $this->createOrderWithStatus($restaurant, $tables, $menuItems, $customers, $today, 'preparing');
        
        // Ready order
        $this->createOrderWithStatus($restaurant, $tables, $menuItems, $customers, $today, 'ready');
    }

    /**
     * Create order with specific status
     */
    private function createOrderWithStatus(Restaurant $restaurant, $tables, $menuItems, $customers, Carbon $date, string $status): void
    {
        $table = $tables->random();
        $customer = $customers->random();
        $orderTime = $this->getRandomOrderTime($date, $restaurant);
        
        $order = Order::create([
            'tenant_id' => $restaurant->tenant_id,
            'restaurant_id' => $restaurant->id,
            'table_id' => $table->id,
            'customer_id' => $customer->id,
            'order_number' => $this->generateOrderNumber($restaurant),
            'status' => $status,
            'payment_status' => $this->getPaymentStatus($status),
            'payment_method' => $this->getRandomPaymentMethod(),
            'subtotal' => 0,
            'tax_amount' => 0,
            'delivery_fee' => 0,
            'total_amount' => 0,
            'notes' => $this->getRandomOrderNotes(),
            'created_at' => $orderTime,
            'updated_at' => $orderTime,
        ]);

        $this->createOrderItems($order, $menuItems);
        $this->updateOrderTotals($order);
    }

    /**
     * Create order items for an order
     */
    private function createOrderItems(Order $order, $menuItems): void
    {
        $itemCount = rand(1, 5); // 1-5 items per order
        $selectedItems = $menuItems->random($itemCount);
        
        foreach ($selectedItems as $menuItem) {
            $quantity = rand(1, 3);
            $specialInstructions = rand(1, 10) <= 3 ? $this->getRandomSpecialInstructions() : null;
            
            OrderItem::create([
                'tenant_id' => $order->tenant_id,
                'order_id' => $order->id,
                'menu_item_id' => $menuItem->id,
                'quantity' => $quantity,
                'price' => $menuItem->price,
                'total' => $menuItem->price * $quantity,
                'notes' => $specialInstructions,
                'created_at' => $order->created_at,
                'updated_at' => $order->created_at,
            ]);
        }
    }

    /**
     * Update order totals
     */
    private function updateOrderTotals(Order $order): void
    {
        $subtotal = $order->items->sum('total_price');
        $taxRate = $order->restaurant->settings['tax_rate'] ?? 0.08;
        $taxAmount = $subtotal * $taxRate;
        $deliveryFee = $order->delivery_fee;
        $totalAmount = $subtotal + $taxAmount + $deliveryFee;
        
        $order->update([
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
        ]);
    }

    /**
     * Get random order time within business hours
     */
    private function getRandomOrderTime(Carbon $date, Restaurant $restaurant): Carbon
    {
        $dayOfWeek = strtolower($date->format('l'));
        $businessHours = $restaurant->business_hours[$dayOfWeek] ?? ['open' => '09:00', 'close' => '21:00'];
        
        $openTime = Carbon::createFromTimeString($date->format('Y-m-d') . ' ' . $businessHours['open']);
        $closeTime = Carbon::createFromTimeString($date->format('Y-m-d') . ' ' . $businessHours['close']);
        
        // Add some randomness to the time
        $randomMinutes = rand(0, $openTime->diffInMinutes($closeTime));
        
        return $openTime->addMinutes($randomMinutes);
    }

    /**
     * Get order status based on time
     */
    private function getOrderStatus(Carbon $orderTime): string
    {
        $now = Carbon::now();
        $diffInHours = $orderTime->diffInHours($now);
        
        if ($diffInHours > 24) {
            return 'delivered';
        } elseif ($diffInHours > 2) {
            return rand(1, 10) <= 8 ? 'delivered' : 'cancelled';
        } elseif ($diffInHours > 1) {
            return rand(1, 10) <= 7 ? 'delivered' : 'ready';
        } elseif ($diffInHours > 0.5) {
            return rand(1, 10) <= 6 ? 'preparing' : 'confirmed';
        } else {
            return rand(1, 10) <= 7 ? 'pending' : 'confirmed';
        }
    }

    /**
     * Get payment status based on order status
     */
    private function getPaymentStatus(string $orderStatus): string
    {
        return match($orderStatus) {
            'delivered' => 'paid',
            'cancelled' => 'refunded',
            default => rand(1, 10) <= 7 ? 'pending' : 'paid'
        };
    }

    /**
     * Get random payment method
     */
    private function getRandomPaymentMethod(): string
    {
        $methods = ['cash', 'card', 'digital_wallet', 'bank_transfer'];
        return $methods[array_rand($methods)];
    }

    /**
     * Generate unique order number
     */
    private function generateOrderNumber(Restaurant $restaurant): string
    {
        $prefix = strtoupper(substr($restaurant->name, 0, 3));
        $timestamp = now()->format('Ymd');
        $microtime = substr(microtime(), 2, 6); // Use microtime for uniqueness
        $random = str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);
        
        return "{$prefix}-{$timestamp}-{$microtime}{$random}";
    }

    /**
     * Get random order notes
     */
    private function getRandomOrderNotes(): ?string
    {
        $notes = [
            null,
            'Please make it extra spicy',
            'No onions please',
            'Extra sauce on the side',
            'Well done',
            'Medium rare',
            'No salt',
            'Extra cheese',
            'Gluten-free please',
            'Allergic to nuts',
            'Table by the window',
            'Birthday celebration',
            'Anniversary dinner',
            'Business meeting',
        ];
        
        return rand(1, 10) <= 3 ? $notes[array_rand($notes)] : null;
    }

    /**
     * Get random special instructions
     */
    private function getRandomSpecialInstructions(): ?string
    {
        $instructions = [
            'Extra crispy',
            'Light on salt',
            'No garnish',
            'Extra sauce',
            'Well done',
            'Rare',
            'Medium',
            'No pickles',
            'Extra pickles',
            'On the side',
            'Extra hot',
            'Mild',
        ];
        
        return $instructions[array_rand($instructions)];
    }

    /**
     * Get random cancellation reason
     */
    private function getRandomCancellationReason(): ?string
    {
        $reasons = [
            'Customer cancelled',
            'Restaurant closed',
            'Item unavailable',
            'Kitchen error',
            'Customer no-show',
            'Payment failed',
            'Duplicate order',
            'Wrong address',
        ];
        
        return $reasons[array_rand($reasons)];
    }
}

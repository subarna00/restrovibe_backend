<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class OrderController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of orders for the current tenant
     */
    public function index(Request $request)
    {
        $user = auth('tenant')->user();
        
        $query = Order::with(['restaurant', 'customer', 'items'])
            ->where('tenant_id', $user->tenant_id);

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('restaurant_id')) {
            $query->where('restaurant_id', $request->restaurant_id);
        }

        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $orders = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'orders' => $orders,
        ]);
    }

    /**
     * Store a newly created order
     */
    public function store(Request $request)
    {
        $user = auth('tenant')->user();
        
        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'customer_id' => 'nullable|exists:users,id',
            'items' => 'required|array',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'delivery_fee' => 'nullable|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'delivery_address' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // Verify restaurant belongs to tenant
        $restaurant = Restaurant::where('id', $validated['restaurant_id'])
            ->where('tenant_id', $user->tenant_id)
            ->firstOrFail();

        $this->authorizeForUser($user, 'create', $restaurant);

        $order = Order::create([
            'tenant_id' => $user->tenant_id,
            'restaurant_id' => $validated['restaurant_id'],
            'customer_id' => $validated['customer_id'] ?? null,
            'order_number' => $this->generateOrderNumber(),
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'subtotal' => $validated['subtotal'],
            'tax_amount' => $validated['tax_amount'],
            'delivery_fee' => $validated['delivery_fee'] ?? 0,
            'total_amount' => $validated['total_amount'],
            'delivery_address' => $validated['delivery_address'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        // Create order items
        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'menu_item_id' => $item['menu_item_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'total' => $item['quantity'] * $item['price'],
            ]);
        }

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load(['restaurant', 'customer', 'items']),
        ], 201);
    }

    /**
     * Display the specified order
     */
    public function show(Order $order)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $order);

        return response()->json([
            'order' => $order->load(['restaurant', 'customer', 'items.menuItem']),
        ]);
    }

    /**
     * Update the specified order
     */
    public function update(Request $request, Order $order)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $order);

        $validated = $request->validate([
            'status' => 'sometimes|string|in:pending,confirmed,preparing,ready,delivered,cancelled',
            'payment_status' => 'sometimes|string|in:pending,paid,failed,refunded',
            'notes' => 'sometimes|string',
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order->load(['restaurant', 'customer', 'items']),
        ]);
    }

    /**
     * Remove the specified order
     */
    public function destroy(Order $order)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'delete', $order);

        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully',
        ]);
    }

    /**
     * Update order status
     */
    public function updateStatus(Request $request, Order $order)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $order);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,confirmed,preparing,ready,delivered,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order,
        ]);
    }

    /**
     * Update payment status
     */
    public function updatePayment(Request $request, Order $order)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $order);

        $validated = $request->validate([
            'payment_status' => 'required|string|in:pending,paid,failed,refunded',
        ]);

        $order->update(['payment_status' => $validated['payment_status']]);

        return response()->json([
            'message' => 'Payment status updated successfully',
            'order' => $order,
        ]);
    }

    /**
     * Generate unique order number
     */
    private function generateOrderNumber(): string
    {
        do {
            $orderNumber = 'ORD-' . strtoupper(uniqid());
        } while (Order::where('order_number', $orderNumber)->exists());

        return $orderNumber;
    }
}

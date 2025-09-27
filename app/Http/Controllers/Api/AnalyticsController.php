<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Order;
use App\Models\MenuItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    use AuthorizesRequests;

    /**
     * Get analytics overview
     */
    public function overview(Request $request)
    {
        $user = auth('tenant')->user();
        
        $restaurantId = $request->get('restaurant_id');
        if ($restaurantId) {
            $restaurant = Restaurant::where('id', $restaurantId)
                ->where('tenant_id', $user->tenant_id)
                ->firstOrFail();
            $this->authorizeForUser($user, 'view', $restaurant);
        }

        $query = Order::where('tenant_id', $user->tenant_id);
        if ($restaurantId) {
            $query->where('restaurant_id', $restaurantId);
        }

        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();
        $lastMonth = Carbon::now()->subMonth()->startOfMonth();

        $overview = [
            'orders' => [
                'today' => (clone $query)->whereDate('created_at', $today)->count(),
                'this_month' => (clone $query)->where('created_at', '>=', $thisMonth)->count(),
                'last_month' => (clone $query)
                    ->where('created_at', '>=', $lastMonth)
                    ->where('created_at', '<', $thisMonth)
                    ->count(),
            ],
            'revenue' => [
                'today' => (clone $query)->whereDate('created_at', $today)->sum('total_amount'),
                'this_month' => (clone $query)->where('created_at', '>=', $thisMonth)->sum('total_amount'),
                'last_month' => (clone $query)
                    ->where('created_at', '>=', $lastMonth)
                    ->where('created_at', '<', $thisMonth)
                    ->sum('total_amount'),
            ],
            'average_order_value' => [
                'this_month' => (clone $query)->where('created_at', '>=', $thisMonth)->avg('total_amount'),
                'last_month' => (clone $query)
                    ->where('created_at', '>=', $lastMonth)
                    ->where('created_at', '<', $thisMonth)
                    ->avg('total_amount'),
            ],
        ];

        return response()->json([
            'overview' => $overview,
        ]);
    }

    /**
     * Get revenue analytics
     */
    public function revenue(Request $request)
    {
        $user = auth('tenant')->user();
        
        $restaurantId = $request->get('restaurant_id');
        $period = $request->get('period', '30'); // days

        $query = Order::where('tenant_id', $user->tenant_id)
            ->where('payment_status', 'paid');

        if ($restaurantId) {
            $restaurant = Restaurant::where('id', $restaurantId)
                ->where('tenant_id', $user->tenant_id)
                ->firstOrFail();
            $this->authorizeForUser($user, 'view', $restaurant);
            $query->where('restaurant_id', $restaurantId);
        }

        $startDate = Carbon::now()->subDays($period);
        $query->where('created_at', '>=', $startDate);

        $revenue = $query->select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(total_amount) as total'),
            DB::raw('COUNT(*) as orders')
        )
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        $totalRevenue = $revenue->sum('total');
        $totalOrders = $revenue->sum('orders');
        $averageOrderValue = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;

        return response()->json([
            'revenue' => [
                'data' => $revenue,
                'summary' => [
                    'total_revenue' => $totalRevenue,
                    'total_orders' => $totalOrders,
                    'average_order_value' => $averageOrderValue,
                ],
            ],
        ]);
    }

    /**
     * Get order analytics
     */
    public function orders(Request $request)
    {
        $user = auth('tenant')->user();
        
        $restaurantId = $request->get('restaurant_id');
        $period = $request->get('period', '30'); // days

        $query = Order::where('tenant_id', $user->tenant_id);

        if ($restaurantId) {
            $restaurant = Restaurant::where('id', $restaurantId)
                ->where('tenant_id', $user->tenant_id)
                ->firstOrFail();
            $this->authorizeForUser($user, 'view', $restaurant);
            $query->where('restaurant_id', $restaurantId);
        }

        $startDate = Carbon::now()->subDays($period);
        $query->where('created_at', '>=', $startDate);

        $orders = $query->select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count'),
            DB::raw('status')
        )
        ->groupBy('date', 'status')
        ->orderBy('date')
        ->get();

        $statusCounts = $query->select(
            DB::raw('status'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('status')
        ->get()
        ->pluck('count', 'status');

        return response()->json([
            'orders' => [
                'data' => $orders,
                'status_counts' => $statusCounts,
            ],
        ]);
    }

    /**
     * Get menu analytics
     */
    public function menu(Request $request)
    {
        $user = auth('tenant')->user();
        
        $restaurantId = $request->get('restaurant_id');
        $period = $request->get('period', '30'); // days

        $query = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('menu_items', 'order_items.menu_item_id', '=', 'menu_items.id')
            ->where('orders.tenant_id', $user->tenant_id)
            ->where('orders.payment_status', 'paid');

        if ($restaurantId) {
            $restaurant = Restaurant::where('id', $restaurantId)
                ->where('tenant_id', $user->tenant_id)
                ->firstOrFail();
            $this->authorizeForUser($user, 'view', $restaurant);
            $query->where('orders.restaurant_id', $restaurantId);
        }

        $startDate = Carbon::now()->subDays($period);
        $query->where('orders.created_at', '>=', $startDate);

        $popularItems = $query->select(
            'menu_items.name',
            'menu_items.id',
            DB::raw('SUM(order_items.quantity) as total_quantity'),
            DB::raw('SUM(order_items.total) as total_revenue'),
            DB::raw('COUNT(DISTINCT orders.id) as order_count')
        )
        ->groupBy('menu_items.id', 'menu_items.name')
        ->orderBy('total_quantity', 'desc')
        ->limit(10)
        ->get();

        $categoryStats = $query->join('menu_categories', 'menu_items.menu_category_id', '=', 'menu_categories.id')
            ->select(
                'menu_categories.name',
                'menu_categories.id',
                DB::raw('SUM(order_items.quantity) as total_quantity'),
                DB::raw('SUM(order_items.total) as total_revenue')
            )
            ->groupBy('menu_categories.id', 'menu_categories.name')
            ->orderBy('total_revenue', 'desc')
            ->get();

        return response()->json([
            'menu' => [
                'popular_items' => $popularItems,
                'category_stats' => $categoryStats,
            ],
        ]);
    }

    /**
     * Get staff analytics
     */
    public function staff(Request $request)
    {
        $user = auth('tenant')->user();
        
        $restaurantId = $request->get('restaurant_id');

        $query = User::where('tenant_id', $user->tenant_id)
            ->where('role', '!=', 'customer');

        if ($restaurantId) {
            $restaurant = Restaurant::where('id', $restaurantId)
                ->where('tenant_id', $user->tenant_id)
                ->firstOrFail();
            $this->authorizeForUser($user, 'view', $restaurant);
            $query->where('restaurant_id', $restaurantId);
        }

        $staff = $query->select(
            'role',
            'status',
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('role', 'status')
        ->get();

        $roleCounts = $query->select(
            'role',
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('role')
        ->get()
        ->pluck('count', 'role');

        $statusCounts = $query->select(
            'status',
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('status')
        ->get()
        ->pluck('count', 'status');

        return response()->json([
            'staff' => [
                'data' => $staff,
                'role_counts' => $roleCounts,
                'status_counts' => $statusCounts,
            ],
        ]);
    }
}

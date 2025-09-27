<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of staff for the current tenant
     */
    public function index(Request $request)
    {
        $user = auth('tenant')->user();
        
        $query = User::where('tenant_id', $user->tenant_id)
            ->where('role', '!=', 'customer')
            ->with(['restaurant']);

        // Apply filters
        if ($request->has('restaurant_id')) {
            $query->where('restaurant_id', $request->restaurant_id);
        }

        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $staff = $query->orderBy('name')
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'staff' => $staff,
        ]);
    }

    /**
     * Store a newly created staff member
     */
    public function store(Request $request)
    {
        $user = auth('tenant')->user();
        
        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:restaurant_owner,manager,staff',
            'phone' => 'nullable|string|max:20',
            'permissions' => 'nullable|array',
        ]);

        // Verify restaurant belongs to tenant
        $restaurant = Restaurant::where('id', $validated['restaurant_id'])
            ->where('tenant_id', $user->tenant_id)
            ->firstOrFail();

        $this->authorizeForUser($user, 'create', $restaurant);

        $staff = User::create([
            'tenant_id' => $user->tenant_id,
            'restaurant_id' => $validated['restaurant_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'phone' => $validated['phone'] ?? null,
            'permissions' => $validated['permissions'] ?? $this->getDefaultPermissions($validated['role']),
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Staff member created successfully',
            'staff' => $staff->load(['restaurant']),
        ], 201);
    }

    /**
     * Display the specified staff member
     */
    public function show(User $user)
    {
        $currentUser = auth('tenant')->user();
        $this->authorizeForUser($currentUser, 'view', $user);

        return response()->json([
            'staff' => $user->load(['restaurant']),
        ]);
    }

    /**
     * Update the specified staff member
     */
    public function update(Request $request, User $user)
    {
        $currentUser = auth('tenant')->user();
        $this->authorizeForUser($currentUser, 'update', $user);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8',
            'role' => 'sometimes|string|in:restaurant_owner,manager,staff',
            'phone' => 'nullable|string|max:20',
            'permissions' => 'nullable|array',
            'status' => 'sometimes|string|in:active,inactive',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Staff member updated successfully',
            'staff' => $user->load(['restaurant']),
        ]);
    }

    /**
     * Remove the specified staff member
     */
    public function destroy(User $user)
    {
        $currentUser = auth('tenant')->user();
        $this->authorizeForUser($currentUser, 'delete', $user);

        $user->delete();

        return response()->json([
            'message' => 'Staff member deleted successfully',
        ]);
    }

    /**
     * Update staff member role
     */
    public function updateRole(Request $request, User $user)
    {
        $currentUser = auth('tenant')->user();
        $this->authorizeForUser($currentUser, 'update', $user);

        $validated = $request->validate([
            'role' => 'required|string|in:restaurant_owner,manager,staff',
        ]);

        $user->update([
            'role' => $validated['role'],
            'permissions' => $this->getDefaultPermissions($validated['role']),
        ]);

        return response()->json([
            'message' => 'Staff role updated successfully',
            'staff' => $user,
        ]);
    }

    /**
     * Update staff member permissions
     */
    public function updatePermissions(Request $request, User $user)
    {
        $currentUser = auth('tenant')->user();
        $this->authorizeForUser($currentUser, 'update', $user);

        $validated = $request->validate([
            'permissions' => 'required|array',
        ]);

        $user->update(['permissions' => $validated['permissions']]);

        return response()->json([
            'message' => 'Staff permissions updated successfully',
            'staff' => $user,
        ]);
    }

    /**
     * Update staff member status
     */
    public function updateStatus(Request $request, User $user)
    {
        $currentUser = auth('tenant')->user();
        $this->authorizeForUser($currentUser, 'update', $user);

        $validated = $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);

        $user->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Staff status updated successfully',
            'staff' => $user,
        ]);
    }

    /**
     * Get default permissions for a role
     */
    private function getDefaultPermissions(string $role): array
    {
        $permissions = [
            'restaurant_owner' => [
                'manage_restaurant',
                'manage_menu',
                'manage_orders',
                'manage_staff',
                'manage_inventory',
                'view_reports',
                'manage_settings',
                'manage_subscription',
            ],
            'manager' => [
                'manage_menu',
                'manage_orders',
                'manage_staff',
                'manage_inventory',
                'view_reports',
                'manage_settings',
            ],
            'staff' => [
                'manage_orders',
                'view_menu',
                'manage_inventory',
            ],
        ];

        return $permissions[$role] ?? [];
    }
}

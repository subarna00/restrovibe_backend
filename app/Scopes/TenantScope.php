<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class TenantScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        // Skip tenant scoping for User model to prevent circular dependency
        if ($model instanceof \App\Models\User) {
            return;
        }

        // Check for authenticated user in any guard
        $user = null;
        if (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user();
        } elseif (Auth::guard('tenant')->check()) {
            $user = Auth::guard('tenant')->user();
        } elseif (Auth::guard('api')->check()) {
            $user = Auth::guard('api')->user();
        } elseif (Auth::check()) {
            $user = Auth::user();
        }

        // Skip tenant scoping for super admin users
        if ($user && $user->isSuperAdmin()) {
            return;
        }

        // Skip tenant scoping if no authenticated user
        if (!$user) {
            return;
        }

        // Apply tenant scope for regular users
        $tenantId = $user->tenant_id;
        if ($tenantId) {
            $builder->where($model->getTable() . '.tenant_id', $tenantId);
        }
    }

    /**
     * Extend the query builder with the needed functions.
     */
    public function extend(Builder $builder): void
    {
        $builder->macro('withoutTenantScope', function (Builder $builder) {
            return $builder->withoutGlobalScope($this);
        });

        $builder->macro('withTenantScope', function (Builder $builder, $tenantId) {
            return $builder->withoutGlobalScope($this)->where('tenant_id', $tenantId);
        });
    }
}

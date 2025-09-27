<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreateTenantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'domain' => ['nullable', 'string', 'max:255', 'unique:tenants,domain'],
            'status' => ['nullable', 'in:active,inactive,suspended'],
            'subscription_plan' => ['required', 'in:basic,professional,enterprise'],
            'subscription_status' => ['nullable', 'in:active,inactive,cancelled,expired'],
            'subscription_expires_at' => ['nullable', 'date', 'after:now'],
            'settings' => ['nullable', 'array'],
            'primary_color' => ['nullable', 'string', 'max:7'],
            'secondary_color' => ['nullable', 'string', 'max:7'],
            'owner' => ['nullable', 'array'],
            'owner.name' => ['required_with:owner', 'string', 'max:255'],
            'owner.email' => ['required_with:owner', 'email', 'unique:users,email'],
            'owner.password' => ['required_with:owner', 'string', 'min:8'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Tenant name is required.',
            'subscription_plan.required' => 'Subscription plan is required.',
            'subscription_plan.in' => 'Invalid subscription plan selected.',
            'domain.unique' => 'This domain is already taken.',
            'owner.email.unique' => 'This email is already registered.',
        ];
    }
}

<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTenantRequest extends FormRequest
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
        $tenantId = $this->route('tenant')->id ?? null;

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'domain' => ['sometimes', 'string', 'max:255', 'unique:tenants,domain,' . $tenantId],
            'status' => ['sometimes', 'in:active,inactive,suspended'],
            'subscription_plan' => ['sometimes', 'in:basic,professional,enterprise'],
            'subscription_status' => ['sometimes', 'in:active,inactive,cancelled,expired'],
            'subscription_expires_at' => ['sometimes', 'date', 'after:now'],
            'settings' => ['sometimes', 'array'],
            'primary_color' => ['sometimes', 'string', 'max:7'],
            'secondary_color' => ['sometimes', 'string', 'max:7'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'subscription_plan.in' => 'Invalid subscription plan selected.',
            'status.in' => 'Invalid status selected.',
            'subscription_status.in' => 'Invalid subscription status selected.',
            'domain.unique' => 'This domain is already taken.',
        ];
    }
}

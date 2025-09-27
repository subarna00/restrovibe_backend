<?php

namespace App\Http\Requests\Api\Mobile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest
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
            // User information
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => ['nullable', 'string', 'max:20'],

            // Restaurant information
            'restaurant_name' => ['required', 'string', 'max:255'],
            'restaurant_description' => ['nullable', 'string', 'max:1000'],
            'restaurant_address' => ['required', 'string', 'max:255'],
            'restaurant_city' => ['required', 'string', 'max:100'],
            'restaurant_state' => ['required', 'string', 'max:50'],
            'restaurant_zip' => ['required', 'string', 'max:10'],
            'restaurant_country' => ['nullable', 'string', 'max:2'],
            'restaurant_phone' => ['required', 'string', 'max:20'],
            'restaurant_website' => ['nullable', 'url', 'max:255'],

            // Restaurant settings
            'cuisine_type' => ['nullable', 'string', 'max:100'],
            'price_range' => ['nullable', 'in:$,$$,$$$,$$$$'],
            'delivery_available' => ['nullable', 'boolean'],
            'max_delivery_distance' => ['nullable', 'integer', 'min:1', 'max:50'],

            // Subscription
            'subscription_plan' => ['required', 'in:basic,professional,enterprise'],

            // Mobile specific
            'device_id' => ['nullable', 'string', 'max:255'],
            'device_type' => ['nullable', 'in:ios,android'],
            'app_version' => ['nullable', 'string', 'max:20'],

            // Terms and conditions
            'terms_accepted' => ['required', 'accepted'],
            'privacy_accepted' => ['required', 'accepted'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'restaurant_name.required' => 'Restaurant name is required.',
            'restaurant_address.required' => 'Restaurant address is required.',
            'restaurant_city.required' => 'Restaurant city is required.',
            'restaurant_state.required' => 'Restaurant state is required.',
            'restaurant_zip.required' => 'Restaurant ZIP code is required.',
            'restaurant_phone.required' => 'Restaurant phone number is required.',
            'subscription_plan.required' => 'Please select a subscription plan.',
            'terms_accepted.required' => 'You must accept the terms and conditions.',
            'privacy_accepted.required' => 'You must accept the privacy policy.',
            'device_type.in' => 'Device type must be either ios or android.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'restaurant_name' => 'restaurant name',
            'restaurant_address' => 'restaurant address',
            'restaurant_city' => 'restaurant city',
            'restaurant_state' => 'restaurant state',
            'restaurant_zip' => 'restaurant ZIP code',
            'restaurant_phone' => 'restaurant phone',
            'subscription_plan' => 'subscription plan',
        ];
    }
}

<?php

namespace App\Http\Requests\Tenant;

use Illuminate\Foundation\Http\FormRequest;

class CreateMenuItemRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'menu_category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'price' => 'required|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'image' => 'nullable|string|max:255',
            'images' => 'nullable|array',
            'is_available' => 'nullable|boolean',
            'is_featured' => 'nullable|boolean',
            'is_vegetarian' => 'nullable|boolean',
            'is_vegan' => 'nullable|boolean',
            'is_gluten_free' => 'nullable|boolean',
            'is_spicy' => 'nullable|boolean',
            'spice_level' => 'nullable|integer|min:0|max:5',
            'preparation_time' => 'nullable|integer|min:0',
            'calories' => 'nullable|integer|min:0',
            'allergens' => 'nullable|array',
            'ingredients' => 'nullable|array',
            'nutritional_info' => 'nullable|array',
            'sort_order' => 'nullable|integer|min:0',
            'stock_quantity' => 'nullable|integer|min:0',
            'track_inventory' => 'nullable|boolean',
            'min_stock_level' => 'nullable|integer|min:0',
            'variants' => 'nullable|array',
            'settings' => 'nullable|array',
        ];
    }
}

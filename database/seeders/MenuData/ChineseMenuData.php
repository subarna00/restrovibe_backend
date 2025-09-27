<?php

namespace Database\Seeders\MenuData;

class ChineseMenuData
{
    public static function getMenu(): array
    {
        return [
            [
                'name' => 'Appetizers',
                'description' => 'Traditional Chinese appetizers',
                'image' => 'chinese_appetizers.jpg',
                'sort_order' => 1,
                'items' => [
                    [
                        'name' => 'Spring Rolls',
                        'description' => 'Crispy vegetable spring rolls with sweet and sour sauce',
                        'price' => 6.99,
                        'cost_price' => 2.50,
                        'is_vegetarian' => true,
                        'preparation_time' => 8,
                        'calories' => 180,
                        'ingredients' => ['cabbage', 'carrots', 'spring roll wrapper', 'sweet and sour sauce'],
                        'sort_order' => 1,
                    ],
                ]
            ],
            [
                'name' => 'Main Dishes',
                'description' => 'Authentic Chinese main courses',
                'image' => 'chinese_mains.jpg',
                'sort_order' => 2,
                'items' => [
                    [
                        'name' => 'Kung Pao Chicken',
                        'description' => 'Spicy chicken with peanuts and vegetables',
                        'price' => 13.99,
                        'cost_price' => 5.50,
                        'is_featured' => true,
                        'is_spicy' => true,
                        'spice_level' => 4,
                        'preparation_time' => 15,
                        'calories' => 420,
                        'ingredients' => ['chicken', 'peanuts', 'bell peppers', 'soy sauce', 'chili'],
                        'sort_order' => 1,
                    ],
                ]
            ],
        ];
    }
}

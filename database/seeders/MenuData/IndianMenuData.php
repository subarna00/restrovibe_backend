<?php

namespace Database\Seeders\MenuData;

class IndianMenuData
{
    public static function getMenu(): array
    {
        return [
            [
                'name' => 'Curries',
                'description' => 'Authentic Indian curries with aromatic spices',
                'image' => 'curries.jpg',
                'sort_order' => 1,
                'items' => [
                    [
                        'name' => 'Chicken Tikka Masala',
                        'description' => 'Tender chicken in creamy tomato curry sauce',
                        'price' => 15.99,
                        'cost_price' => 6.50,
                        'is_featured' => true,
                        'is_spicy' => true,
                        'spice_level' => 3,
                        'preparation_time' => 20,
                        'calories' => 480,
                        'allergens' => ['dairy'],
                        'ingredients' => ['chicken', 'tomatoes', 'cream', 'garam masala', 'ginger', 'garlic'],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Dal Makhani',
                        'description' => 'Creamy black lentils with butter and cream',
                        'price' => 12.99,
                        'cost_price' => 4.00,
                        'is_vegetarian' => true,
                        'preparation_time' => 25,
                        'calories' => 320,
                        'allergens' => ['dairy'],
                        'ingredients' => ['black lentils', 'kidney beans', 'butter', 'cream', 'spices'],
                        'sort_order' => 2,
                    ],
                ]
            ],
            [
                'name' => 'Breads',
                'description' => 'Fresh Indian breads',
                'image' => 'breads.jpg',
                'sort_order' => 2,
                'items' => [
                    [
                        'name' => 'Garlic Naan',
                        'description' => 'Soft bread with garlic and herbs',
                        'price' => 4.99,
                        'cost_price' => 1.50,
                        'is_vegetarian' => true,
                        'preparation_time' => 5,
                        'calories' => 180,
                        'allergens' => ['gluten', 'dairy'],
                        'ingredients' => ['flour', 'garlic', 'butter', 'herbs'],
                        'sort_order' => 1,
                    ],
                ]
            ],
        ];
    }
}

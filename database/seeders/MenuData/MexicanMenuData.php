<?php

namespace Database\Seeders\MenuData;

class MexicanMenuData
{
    public static function getMenu(): array
    {
        return [
            [
                'name' => 'Tacos',
                'description' => 'Authentic Mexican tacos with fresh ingredients',
                'image' => 'tacos.jpg',
                'sort_order' => 1,
                'items' => [
                    [
                        'name' => 'Carnitas Tacos',
                        'description' => 'Slow-cooked pork with onions, cilantro, and lime',
                        'price' => 9.99,
                        'cost_price' => 3.50,
                        'is_featured' => true,
                        'preparation_time' => 8,
                        'calories' => 320,
                        'ingredients' => ['pork', 'onions', 'cilantro', 'lime', 'corn tortillas'],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Fish Tacos',
                        'description' => 'Grilled fish with cabbage slaw and chipotle mayo',
                        'price' => 11.99,
                        'cost_price' => 4.50,
                        'preparation_time' => 10,
                        'calories' => 280,
                        'ingredients' => ['white fish', 'cabbage', 'chipotle mayo', 'lime', 'tortillas'],
                        'sort_order' => 2,
                    ],
                ]
            ],
            [
                'name' => 'Burritos',
                'description' => 'Large flour tortillas filled with your choice of ingredients',
                'image' => 'burritos.jpg',
                'sort_order' => 2,
                'items' => [
                    [
                        'name' => 'Chicken Burrito',
                        'description' => 'Grilled chicken with rice, beans, cheese, and salsa',
                        'price' => 12.99,
                        'cost_price' => 5.00,
                        'is_featured' => true,
                        'preparation_time' => 12,
                        'calories' => 650,
                        'allergens' => ['gluten', 'dairy'],
                        'ingredients' => ['chicken', 'rice', 'beans', 'cheese', 'salsa', 'flour tortilla'],
                        'sort_order' => 1,
                    ],
                ]
            ],
        ];
    }
}

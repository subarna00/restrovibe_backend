<?php

namespace Database\Seeders\MenuData;

class AmericanMenuData
{
    public static function getMenu(): array
    {
        return [
            [
                'name' => 'Appetizers',
                'description' => 'Start your meal with our delicious appetizers',
                'image' => 'appetizers.jpg',
                'sort_order' => 1,
                'items' => [
                    [
                        'name' => 'Buffalo Wings',
                        'description' => 'Crispy chicken wings tossed in our signature buffalo sauce',
                        'price' => 11.99,
                        'cost_price' => 4.50,
                        'is_featured' => true,
                        'is_spicy' => true,
                        'spice_level' => 3,
                        'preparation_time' => 15,
                        'calories' => 450,
                        'allergens' => ['dairy'],
                        'ingredients' => ['chicken wings', 'buffalo sauce', 'celery', 'blue cheese'],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Loaded Nachos',
                        'description' => 'Tortilla chips topped with cheese, jalapeños, and sour cream',
                        'price' => 9.99,
                        'cost_price' => 3.50,
                        'is_vegetarian' => true,
                        'preparation_time' => 10,
                        'calories' => 380,
                        'allergens' => ['dairy'],
                        'ingredients' => ['tortilla chips', 'cheese', 'jalapeños', 'sour cream', 'tomatoes'],
                        'sort_order' => 2,
                    ],
                ]
            ],
            [
                'name' => 'Burgers',
                'description' => 'Juicy burgers made with premium beef',
                'image' => 'burgers.jpg',
                'sort_order' => 2,
                'items' => [
                    [
                        'name' => 'Classic Cheeseburger',
                        'description' => 'Beef patty with cheese, lettuce, tomato, and our special sauce',
                        'price' => 12.99,
                        'cost_price' => 5.00,
                        'is_featured' => true,
                        'preparation_time' => 12,
                        'calories' => 650,
                        'allergens' => ['gluten', 'dairy'],
                        'ingredients' => ['beef patty', 'cheese', 'lettuce', 'tomato', 'onion', 'bun'],
                        'variants' => [
                            'sizes' => [
                                ['name' => 'Single', 'price' => 12.99],
                                ['name' => 'Double', 'price' => 15.99]
                            ]
                        ],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'BBQ Bacon Burger',
                        'description' => 'Beef patty with bacon, BBQ sauce, and crispy onions',
                        'price' => 14.99,
                        'cost_price' => 6.50,
                        'preparation_time' => 15,
                        'calories' => 780,
                        'allergens' => ['gluten', 'dairy'],
                        'ingredients' => ['beef patty', 'bacon', 'BBQ sauce', 'crispy onions', 'bun'],
                        'sort_order' => 2,
                    ],
                ]
            ],
            [
                'name' => 'Salads',
                'description' => 'Fresh and healthy salad options',
                'image' => 'salads.jpg',
                'sort_order' => 3,
                'items' => [
                    [
                        'name' => 'Caesar Salad',
                        'description' => 'Romaine lettuce with parmesan cheese, croutons, and caesar dressing',
                        'price' => 10.99,
                        'cost_price' => 4.00,
                        'is_vegetarian' => true,
                        'preparation_time' => 8,
                        'calories' => 320,
                        'allergens' => ['gluten', 'dairy', 'eggs'],
                        'ingredients' => ['romaine lettuce', 'parmesan', 'croutons', 'caesar dressing'],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Grilled Chicken Salad',
                        'description' => 'Mixed greens with grilled chicken, tomatoes, and balsamic vinaigrette',
                        'price' => 13.99,
                        'cost_price' => 5.50,
                        'preparation_time' => 10,
                        'calories' => 420,
                        'ingredients' => ['mixed greens', 'grilled chicken', 'tomatoes', 'cucumber', 'balsamic vinaigrette'],
                        'sort_order' => 2,
                    ],
                ]
            ],
        ];
    }
}

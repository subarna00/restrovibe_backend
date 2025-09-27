<?php

namespace Database\Seeders\MenuData;

class ItalianMenuData
{
    public static function getMenu(): array
    {
        return [
            [
                'name' => 'Antipasti',
                'description' => 'Traditional Italian appetizers to start your meal',
                'image' => 'antipasti.jpg',
                'sort_order' => 1,
                'settings' => ['display_style' => 'grid', 'show_description' => true],
                'items' => [
                    [
                        'name' => 'Bruschetta Classica',
                        'description' => 'Grilled bread topped with fresh tomatoes, basil, and garlic',
                        'price' => 8.99,
                        'cost_price' => 3.50,
                        'is_featured' => true,
                        'is_vegetarian' => true,
                        'preparation_time' => 10,
                        'calories' => 180,
                        'allergens' => ['gluten'],
                        'ingredients' => ['bread', 'tomatoes', 'basil', 'garlic', 'olive oil'],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Prosciutto e Melone',
                        'description' => 'Thinly sliced prosciutto with fresh cantaloupe',
                        'price' => 12.99,
                        'cost_price' => 6.00,
                        'preparation_time' => 5,
                        'calories' => 220,
                        'ingredients' => ['prosciutto', 'cantaloupe', 'arugula'],
                        'sort_order' => 2,
                    ],
                ]
            ],
            [
                'name' => 'Pasta',
                'description' => 'Handmade pasta with authentic Italian sauces',
                'image' => 'pasta.jpg',
                'sort_order' => 2,
                'items' => [
                    [
                        'name' => 'Spaghetti Carbonara',
                        'description' => 'Classic Roman pasta with eggs, pecorino cheese, and pancetta',
                        'price' => 16.99,
                        'cost_price' => 7.50,
                        'is_featured' => true,
                        'preparation_time' => 15,
                        'calories' => 650,
                        'allergens' => ['gluten', 'eggs', 'dairy'],
                        'ingredients' => ['spaghetti', 'eggs', 'pecorino', 'pancetta', 'black pepper'],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Fettuccine Alfredo',
                        'description' => 'Creamy fettuccine with parmesan cheese and butter',
                        'price' => 15.99,
                        'cost_price' => 6.00,
                        'is_vegetarian' => true,
                        'preparation_time' => 12,
                        'calories' => 720,
                        'allergens' => ['gluten', 'dairy'],
                        'ingredients' => ['fettuccine', 'heavy cream', 'parmesan', 'butter'],
                        'sort_order' => 2,
                    ],
                ]
            ],
            [
                'name' => 'Pizza',
                'description' => 'Wood-fired pizzas with authentic Italian toppings',
                'image' => 'pizza.jpg',
                'sort_order' => 3,
                'items' => [
                    [
                        'name' => 'Margherita',
                        'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
                        'price' => 14.99,
                        'cost_price' => 5.50,
                        'is_featured' => true,
                        'is_vegetarian' => true,
                        'preparation_time' => 12,
                        'calories' => 580,
                        'allergens' => ['gluten', 'dairy'],
                        'ingredients' => ['pizza dough', 'tomato sauce', 'mozzarella', 'basil'],
                        'variants' => [
                            'sizes' => [
                                ['name' => 'Small (10")', 'price' => 12.99],
                                ['name' => 'Large (16")', 'price' => 18.99]
                            ]
                        ],
                        'sort_order' => 1,
                    ],
                    [
                        'name' => 'Quattro Stagioni',
                        'description' => 'Four seasons pizza with artichokes, mushrooms, prosciutto, and olives',
                        'price' => 18.99,
                        'cost_price' => 8.00,
                        'preparation_time' => 15,
                        'calories' => 720,
                        'allergens' => ['gluten', 'dairy'],
                        'ingredients' => ['pizza dough', 'tomato sauce', 'mozzarella', 'artichokes', 'mushrooms', 'prosciutto', 'olives'],
                        'sort_order' => 2,
                    ],
                ]
            ],
        ];
    }
}

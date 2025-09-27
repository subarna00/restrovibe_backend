<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tenant;
use App\Models\Restaurant;
use App\Models\User;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Order;

class ProgressController extends Controller
{
    public function index()
    {
        // Get statistics
        $stats = $this->getProjectStats();
        
        // Get completed features
        $completedFeatures = $this->getCompletedFeatures();
        
        // Get development phases
        $phases = $this->getDevelopmentPhases();
        
        // Get recent achievements
        $achievements = $this->getRecentAchievements();
        
        return view('progress', compact('stats', 'completedFeatures', 'phases', 'achievements'));
    }
    
    private function getProjectStats()
    {
        return [
            'tenants' => Tenant::count(),
            'restaurants' => Restaurant::count(),
            'users' => User::count(),
            'menu_categories' => MenuCategory::count(),
            'menu_items' => MenuItem::count(),
            'orders' => Order::count(),
            'completed_tasks' => 8,
            'in_progress_tasks' => 2,
            'pending_tasks' => 8,
            'progress_percentage' => 44
        ];
    }
    
    private function getCompletedFeatures()
    {
        return [
            [
                'title' => 'Authentication & Authorization',
                'icon' => 'fas fa-shield-alt',
                'color' => 'success',
                'features' => [
                    'Laravel Sanctum',
                    'Role-based access',
                    'Token management',
                    'Multi-guard auth'
                ]
            ],
            [
                'title' => 'Multitenancy',
                'icon' => 'fas fa-building',
                'color' => 'success',
                'features' => [
                    'Tenant isolation',
                    'Global scopes',
                    'Tenant middleware',
                    'Data segregation'
                ]
            ],
            [
                'title' => 'Restaurant Management',
                'icon' => 'fas fa-store',
                'color' => 'success',
                'features' => [
                    'CRUD operations',
                    'Business hours',
                    'Settings management',
                    'Dashboard analytics'
                ]
            ],
            [
                'title' => 'Menu Management',
                'icon' => 'fas fa-utensils',
                'color' => 'success',
                'features' => [
                    'Categories & items',
                    'Inventory tracking',
                    'Image generation',
                    'Bulk operations'
                ]
            ],
            [
                'title' => 'API & Documentation',
                'icon' => 'fas fa-code',
                'color' => 'success',
                'features' => [
                    'RESTful APIs',
                    'Postman collections',
                    'Standardized responses',
                    'Comprehensive docs'
                ]
            ],
            [
                'title' => 'Testing & Quality',
                'icon' => 'fas fa-bug',
                'color' => 'success',
                'features' => [
                    'Demo data seeding',
                    'Test user accounts',
                    'Debug tools',
                    'Error handling'
                ]
            ]
        ];
    }
    
    private function getDevelopmentPhases()
    {
        return [
            [
                'title' => 'Phase 1: Foundation & Core Setup',
                'description' => 'Multitenancy, authentication, basic structure',
                'status' => 'completed',
                'color' => 'success',
                'details' => 'Laravel setup, Sanctum auth, tenant scoping, middleware'
            ],
            [
                'title' => 'Phase 2: Restaurant Management Core',
                'description' => 'Restaurant operations, menu management, staff',
                'status' => 'completed',
                'color' => 'success',
                'details' => 'Restaurant CRUD, menu system, inventory tracking'
            ],
            [
                'title' => 'Phase 3: Point of Sale (POS) System',
                'description' => 'Order management, payments, kitchen display',
                'status' => 'in_progress',
                'color' => 'warning',
                'details' => 'Order models created, Payment integration pending, Kitchen display pending'
            ],
            [
                'title' => 'Phase 4: Analytics & Reporting',
                'description' => 'Business intelligence, performance tracking',
                'status' => 'pending',
                'color' => 'gray',
                'details' => 'Sales analytics, Inventory reports, Staff performance'
            ],
            [
                'title' => 'Phase 5: Customer-Facing Features',
                'description' => 'Online ordering, loyalty program, feedback',
                'status' => 'pending',
                'color' => 'gray',
                'details' => 'Online ordering system, Customer loyalty program, Feedback system'
            ],
            [
                'title' => 'Phase 6: Advanced Features',
                'description' => 'Multi-location, integrations, automation',
                'status' => 'pending',
                'color' => 'gray',
                'details' => 'Multi-location support, Third-party integrations, Automation features'
            ],
            [
                'title' => 'Phase 7: Mobile Applications',
                'description' => 'Native apps for staff and customers',
                'status' => 'pending',
                'color' => 'gray',
                'details' => 'Staff mobile app, Customer mobile app, Push notifications'
            ],
            [
                'title' => 'Phase 8: SaaS Platform Features',
                'description' => 'Subscription billing, white-label, API docs',
                'status' => 'pending',
                'color' => 'gray',
                'details' => 'Subscription management, White-label options, Developer portal'
            ],
            [
                'title' => 'Phase 9: Testing & Deployment',
                'description' => 'Quality assurance, CI/CD, production setup',
                'status' => 'pending',
                'color' => 'gray',
                'details' => 'Comprehensive testing, CI/CD pipeline, Production deployment'
            ],
            [
                'title' => 'Phase 10: Monitoring & Maintenance',
                'description' => 'Application monitoring, backups, security',
                'status' => 'pending',
                'color' => 'gray',
                'details' => 'Application monitoring, Automated backups, Security compliance'
            ]
        ];
    }
    
    private function getRecentAchievements()
    {
        return [
            [
                'title' => 'Fixed Authorization Issues',
                'description' => 'Updated middleware to properly handle Sanctum tokens and standardized API responses',
                'date' => '2025-09-27',
                'icon' => 'fas fa-shield-alt'
            ],
            [
                'title' => 'Postman Collection Updates',
                'description' => 'Enhanced token management, added debugging scripts, and improved error handling',
                'date' => '2025-09-27',
                'icon' => 'fas fa-code'
            ],
            [
                'title' => 'Documentation Organization',
                'description' => 'Moved all documentation to docs folder and created comprehensive index',
                'date' => '2025-09-27',
                'icon' => 'fas fa-book'
            ],
            [
                'title' => 'Menu Management System',
                'description' => 'Complete menu CRUD operations with categories, items, and inventory tracking',
                'date' => '2025-09-26',
                'icon' => 'fas fa-utensils'
            ],
            [
                'title' => 'Multitenancy Implementation',
                'description' => 'Shared database pattern with tenant isolation and global scopes',
                'date' => '2025-09-26',
                'icon' => 'fas fa-building'
            ]
        ];
    }
}

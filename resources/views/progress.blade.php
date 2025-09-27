<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RestroVibe - Project Progress</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1E40AF',
                        secondary: '#3B82F6',
                        success: '#10B981',
                        warning: '#F59E0B',
                        danger: '#EF4444',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-utensils text-3xl text-primary"></i>
                        </div>
                        <div class="ml-4">
                            <h1 class="text-3xl font-bold text-gray-900">RestroVibe</h1>
                            <p class="text-gray-600">Restaurant Management System</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-500">Last Updated</p>
                        <p class="text-sm font-medium text-gray-900">{{ date('M d, Y') }}</p>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Project Overview -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-chart-line text-primary mr-2"></i>
                    Project Overview
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-success text-2xl mr-3"></i>
                            <div>
                                <p class="text-sm text-gray-600">Completed</p>
                                <p class="text-2xl font-bold text-gray-900">{{ $stats['completed_tasks'] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <i class="fas fa-clock text-warning text-2xl mr-3"></i>
                            <div>
                                <p class="text-sm text-gray-600">In Progress</p>
                                <p class="text-2xl font-bold text-gray-900">{{ $stats['in_progress_tasks'] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <i class="fas fa-list text-gray-500 text-2xl mr-3"></i>
                            <div>
                                <p class="text-sm text-gray-600">Pending</p>
                                <p class="text-2xl font-bold text-gray-900">{{ $stats['pending_tasks'] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <i class="fas fa-percentage text-success text-2xl mr-3"></i>
                            <div>
                                <p class="text-sm text-gray-600">Progress</p>
                                <p class="text-2xl font-bold text-gray-900">{{ $stats['progress_percentage'] }}%</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Additional Stats -->
                <div class="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div class="text-center">
                        <p class="text-2xl font-bold text-primary">{{ $stats['tenants'] }}</p>
                        <p class="text-sm text-gray-600">Tenants</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-primary">{{ $stats['restaurants'] }}</p>
                        <p class="text-sm text-gray-600">Restaurants</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-primary">{{ $stats['users'] }}</p>
                        <p class="text-sm text-gray-600">Users</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-primary">{{ $stats['menu_categories'] }}</p>
                        <p class="text-sm text-gray-600">Categories</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-primary">{{ $stats['menu_items'] }}</p>
                        <p class="text-sm text-gray-600">Menu Items</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-primary">{{ $stats['orders'] }}</p>
                        <p class="text-sm text-gray-600">Orders</p>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-star text-primary mr-2"></i>
                    Implemented Features
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @foreach($completedFeatures as $feature)
                    <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex items-center mb-3">
                            <i class="{{ $feature['icon'] }} text-{{ $feature['color'] }} text-xl mr-2"></i>
                            <h3 class="font-semibold text-gray-900">{{ $feature['title'] }}</h3>
                        </div>
                        <ul class="text-sm text-gray-600 space-y-1">
                            @foreach($feature['features'] as $item)
                            <li><i class="fas fa-check text-success mr-1"></i> {{ $item }}</li>
                            @endforeach
                        </ul>
                    </div>
                    @endforeach
                </div>
            </div>

            <!-- Development Phases -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-tasks text-primary mr-2"></i>
                    Development Phases
                </h2>
                <div class="space-y-4">
                    @foreach($phases as $phase)
                    <div class="border-l-4 border-{{ $phase['color'] }} pl-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-semibold text-gray-900">{{ $phase['title'] }}</h3>
                                <p class="text-sm text-gray-600">{{ $phase['description'] }}</p>
                            </div>
                            <span class="bg-{{ $phase['color'] }} text-white px-3 py-1 rounded-full text-sm">
                                @if($phase['status'] === 'completed')
                                    <i class="fas fa-check mr-1"></i>Completed
                                @elseif($phase['status'] === 'in_progress')
                                    <i class="fas fa-clock mr-1"></i>In Progress
                                @else
                                    <i class="fas fa-clock mr-1"></i>Pending
                                @endif
                            </span>
                        </div>
                        <div class="mt-2 text-sm text-gray-600">
                            {{ $phase['details'] }}
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <!-- Recent Achievements -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-trophy text-primary mr-2"></i>
                    Recent Achievements
                </h2>
                <div class="space-y-4">
                    @foreach($achievements as $achievement)
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                                <i class="{{ $achievement['icon'] }} text-white text-sm"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold text-gray-900">{{ $achievement['title'] }}</h3>
                            <p class="text-sm text-gray-600">{{ $achievement['description'] }}</p>
                            <p class="text-xs text-gray-500 mt-1">Completed: {{ date('M d, Y', strtotime($achievement['date'])) }}</p>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <!-- Quick Links -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-link text-primary mr-2"></i>
                    Quick Links
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="/admin/dashboard" class="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <div class="flex items-center">
                            <i class="fas fa-tachometer-alt text-blue-600 text-xl mr-3"></i>
                            <div>
                                <h3 class="font-semibold text-gray-900">Admin Dashboard</h3>
                                <p class="text-sm text-gray-600">System Management</p>
                            </div>
                        </div>
                    </a>
                    <a href="/tenant/dashboard" class="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <div class="flex items-center">
                            <i class="fas fa-building text-green-600 text-xl mr-3"></i>
                            <div>
                                <h3 class="font-semibold text-gray-900">Tenant Dashboard</h3>
                                <p class="text-sm text-gray-600">Restaurant Management</p>
                            </div>
                        </div>
                    </a>
                    <a href="/api/mobile/restaurant" class="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <div class="flex items-center">
                            <i class="fas fa-mobile-alt text-purple-600 text-xl mr-3"></i>
                            <div>
                                <h3 class="font-semibold text-gray-900">Mobile API</h3>
                                <p class="text-sm text-gray-600">Customer App</p>
                            </div>
                        </div>
                    </a>
                    <a href="/request-docs" class="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                        <div class="flex items-center">
                            <i class="fas fa-book text-orange-600 text-xl mr-3"></i>
                            <div>
                                <h3 class="font-semibold text-gray-900">API Documentation</h3>
                                <p class="text-sm text-gray-600">Interactive API Reference</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Technology Stack -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-cogs text-primary mr-2"></i>
                    Technology Stack
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fab fa-laravel text-red-600 text-2xl"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900">Laravel 12.x</h3>
                        <p class="text-sm text-gray-600">Backend Framework</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fab fa-php text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900">PHP 8.2+</h3>
                        <p class="text-sm text-gray-600">Programming Language</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-database text-green-600 text-2xl"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900">MySQL</h3>
                        <p class="text-sm text-gray-600">Database</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-shield-alt text-purple-600 text-2xl"></i>
                        </div>
                        <h3 class="font-semibold text-gray-900">Sanctum</h3>
                        <p class="text-sm text-gray-600">Authentication</p>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t mt-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="text-center text-gray-600">
                    <p>&copy; {{ date('Y') }} RestroVibe. Built with Laravel and ❤️</p>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>

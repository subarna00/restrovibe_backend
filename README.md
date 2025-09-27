# RestroVibe - Restaurant Management System

<p align="center">
<img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## 🍽️ About RestroVibe

RestroVibe is a comprehensive **Restaurant Management System** built as a **SaaS platform** using Laravel. It provides multitenancy support, real-time features, and a complete suite of tools for restaurant operations.

### ✨ Key Features

- **🏢 Multitenancy**: Shared database with tenant isolation
- **🍽️ Restaurant Management**: Complete CRUD operations for restaurants
- **📋 Menu Management**: Categories, items, pricing, and availability
- **📦 Order Management**: Order processing and tracking
- **👥 Staff Management**: Role-based access control
- **📊 Analytics**: Business intelligence and reporting
- **🔐 Authentication**: Laravel Sanctum with role-based permissions
- **📱 Mobile API**: Dedicated endpoints for mobile applications
- **⚡ Real-time**: WebSocket support with Laravel Reverb

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restrovibe_backend
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Start the server**
   ```bash
   php artisan serve
   ```

### 📚 Documentation

All documentation is organized in the [`docs/`](docs/) folder:

- **[📖 Documentation Index](docs/README.md)** - Complete documentation overview
- **[🏗️ API Structure](docs/API_STRUCTURE_DOCUMENTATION.md)** - API endpoints and usage
- **[🔧 Setup Guide](docs/POSTMAN_SETUP_GUIDE.md)** - Postman collection setup
- **[📋 Development Roadmap](docs/RESTAURANT_SAAS_TODO.md)** - Project tasks and progress
- **[🏢 Multitenancy Guide](docs/MULTITENANCY_IMPLEMENTATION.md)** - Architecture details

### 🧪 Testing

The project includes comprehensive Postman collections for testing:

- **Collection**: `RestroVibe_Postman_Collection.json`
- **Environment**: `RestroVibe_Postman_Environment.json`
- **Setup Guide**: [Postman Setup Guide](docs/POSTMAN_SETUP_GUIDE.md)

### 🏗️ Architecture

Built with modern Laravel practices:

- **Laravel 12.x** with PHP 8.2+
- **Laravel Sanctum** for API authentication
- **Multitenancy** with shared database pattern
- **Role-based access control** (RBAC)
- **Service layer architecture**
- **Comprehensive API documentation**

### 👥 User Roles

- **Super Admin**: Platform administration
- **Restaurant Owner**: Restaurant management
- **Manager**: Operational management
- **Staff**: Day-to-day operations
- **Customer**: Order placement

### 🔧 Development

For development setup and guidelines, see:
- [Organized Structure Documentation](docs/ORGANIZED_STRUCTURE_DOCUMENTATION.md)
- [Development Roadmap](docs/RESTAURANT_SAAS_TODO.md)

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

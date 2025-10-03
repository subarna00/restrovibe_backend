# RestroVibe - Frontend & Backend Integration Guide

## 🚀 Quick Start Commands

### Run Both Frontend and Backend
```bash
# Install all dependencies
npm run install:all

# Run both Laravel backend and Next.js frontend
npm run dev

# Or run individually
npm run dev:backend  # Laravel on http://localhost:8000
npm run dev:frontend # Next.js on http://localhost:3000
```

### Database Setup
```bash
# Fresh migration and seeding
npm run fresh

# Or step by step
npm run migrate
npm run seed
```

## 📁 Project Structure

```
restrovibe_backend/
├── app/                    # Laravel Backend
├── database/              # Migrations & Seeders
├── routes/                # API Routes
├── frontend/              # Next.js Frontend
│   ├── app/               # Next.js App Router
│   ├── components/        # React Components
│   ├── lib/               # Utilities & Services
│   │   ├── api-client.ts  # Axios configuration
│   │   ├── types/         # TypeScript types
│   │   └── services/      # API services
│   └── package.json
├── package.json           # Root package.json
└── composer.json          # Laravel dependencies
```

## 🔧 Environment Configuration

### Backend (.env)
```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restrovibe
DB_USERNAME=root
DB_PASSWORD=

# CORS Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔐 Authentication Flow

### 1. Login Process
```typescript
import { authService } from '@/lib/services/auth';

// Login
const loginData = await authService.login({
  email: 'admin@restrovibe.com',
  password: 'password'
});

// Check authentication
if (authService.isAuthenticated()) {
  const user = authService.getUserData();
  const tenant = authService.getTenantData();
  const restaurant = authService.getRestaurantData();
}
```

### 2. Role-Based Access
```typescript
// Check user roles
if (authService.isSuperAdmin()) {
  // Show admin features
}

if (authService.isRestaurantOwner()) {
  // Show restaurant management
}

if (authService.hasPermission('manage_menu')) {
  // Show menu management
}
```

## 📊 API Integration Examples

### 1. Tenant Management (Super Admin)
```typescript
import { tenantService } from '@/lib/services/tenants';

// Get all tenants
const tenants = await tenantService.getTenants({
  page: 1,
  per_page: 10,
  search: 'premium'
});

// Create new tenant
const newTenant = await tenantService.createTenant({
  name: 'New Restaurant Group',
  subscription_plan: 'professional',
  settings: { timezone: 'America/New_York' }
});
```

### 2. Restaurant Management
```typescript
import { restaurantService } from '@/lib/services/restaurants';

// Get restaurants
const restaurants = await restaurantService.getRestaurants();

// Get dashboard data
const dashboard = await restaurantService.getRestaurantDashboard(1);

// Update settings
await restaurantService.updateRestaurantSettings(1, {
  accepts_online_orders: true,
  delivery_available: true,
  minimum_order_amount: 25.00
});
```

### 3. Menu Management
```typescript
import { menuService } from '@/lib/services/menu';

// Get menu categories
const categories = await menuService.getCategories(1);

// Create menu item
const newItem = await menuService.createMenuItem({
  menu_category_id: 1,
  name: 'Margherita Pizza',
  description: 'Classic tomato and mozzarella',
  price: 15.99,
  is_available: true
});
```

### 4. Order Management
```typescript
import { orderService } from '@/lib/services/orders';

// Get orders
const orders = await orderService.getOrders({
  status: 'pending',
  restaurant_id: 1
});

// Update order status
await orderService.updateOrderStatus(1, {
  status: 'preparing',
  notes: 'Started cooking'
});
```

## 🎨 Component Integration

### 1. Dashboard Component
```typescript
'use client';
import { useEffect, useState } from 'react';
import { restaurantService } from '@/lib/services/restaurants';
import { DashboardStats } from '@/lib/types/api';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await restaurantService.getRestaurantDashboard(1);
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!stats) return <div>No data available</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3>Total Orders</h3>
          <p className="text-2xl font-bold">{stats.total_orders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3>Revenue Today</h3>
          <p className="text-2xl font-bold">${stats.revenue_today}</p>
        </div>
        {/* More stats... */}
      </div>
    </div>
  );
}
```

### 2. Data Table Component
```typescript
'use client';
import { useEffect, useState } from 'react';
import { tenantService } from '@/lib/services/tenants';
import { Tenant } from '@/lib/types/api';

export default function TenantsTable() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await tenantService.getTenants();
        setTenants(response.data);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  if (loading) return <div>Loading tenants...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Plan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.name}</td>
              <td>
                <span className={`px-2 py-1 rounded ${
                  tenant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tenant.status}
                </span>
              </td>
              <td>{tenant.subscription_plan}</td>
              <td>
                <button onClick={() => handleEdit(tenant.id)}>Edit</button>
                <button onClick={() => handleDelete(tenant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 🔄 State Management

### Using React Context
```typescript
// contexts/AuthContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/lib/services/auth';
import { User, Tenant, Restaurant } from '@/lib/types/api';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  restaurant: Restaurant | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    if (authService.isAuthenticated()) {
      setUser(authService.getUserData());
      setTenant(authService.getTenantData());
      setRestaurant(authService.getRestaurantData());
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    setUser(data.user);
    setTenant(data.tenant);
    setRestaurant(data.restaurant || null);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setTenant(null);
    setRestaurant(null);
  };

  return (
    <AuthContext.Provider value={{ user, tenant, restaurant, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Docker (Optional)
```dockerfile
# Dockerfile
FROM node:18-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

FROM php:8.2-fpm AS backend
WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --optimize-autoloader
```

## 📝 Next Steps

1. **Complete API Services**: Finish implementing all service files
2. **Add Error Handling**: Implement global error boundaries
3. **Add Loading States**: Create skeleton components
4. **Add Real-time Updates**: Implement WebSocket connections
5. **Add Testing**: Write unit and integration tests
6. **Add Documentation**: Create API documentation
7. **Optimize Performance**: Implement caching and pagination

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure Laravel CORS is configured for localhost:3000
2. **Authentication Issues**: Check if tokens are being stored correctly
3. **API Errors**: Verify API endpoints match the backend routes
4. **Type Errors**: Ensure TypeScript types are up to date

### Debug Commands
```bash
# Check Laravel routes
php artisan route:list

# Check API responses
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/tenant/dashboard

# Check Next.js build
npm run build
```

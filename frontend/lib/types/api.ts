// Base API Types
export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// Tenant Types
export interface Tenant extends BaseEntity {
  name: string;
  slug: string;
  domain?: string;
  status: 'active' | 'suspended' | 'inactive';
  subscription_plan: 'basic' | 'professional' | 'enterprise';
  subscription_status: 'active' | 'expired' | 'cancelled';
  subscription_expires_at: string;
  settings: Record<string, any>;
  logo?: string;
  primary_color?: string;
  secondary_color?: string;
}

// Restaurant Types
export interface Restaurant extends BaseEntity {
  tenant_id: number;
  name: string;
  slug: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  cover_image?: string;
  cuisine_type: string;
  price_range: '$' | '$$' | '$$$' | '$$$$';
  status: 'active' | 'inactive';
  settings: RestaurantSettings;
  business_hours: BusinessHours;
  delivery_zones?: DeliveryZone[];
}

export interface RestaurantSettings {
  accepts_online_orders: boolean;
  delivery_available: boolean;
  pickup_available: boolean;
  max_delivery_distance: number;
  minimum_order_amount?: number;
  delivery_fee?: number;
  tax_rate?: number;
  service_fee?: number;
  auto_accept_orders?: boolean;
  require_phone_verification?: boolean;
}

export interface BusinessHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

export interface DeliveryZone {
  name: string;
  coordinates: number[][];
  delivery_fee: number;
  minimum_order: number;
}

// User Types
export interface User extends BaseEntity {
  tenant_id: number;
  restaurant_id?: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'super_admin' | 'restaurant_owner' | 'manager' | 'staff' | 'customer';
  status: 'active' | 'inactive';
  last_login_at?: string;
  permissions?: string[];
}

// Menu Types
export interface MenuCategory extends BaseEntity {
  tenant_id: number;
  restaurant_id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sort_order: number;
  is_active: boolean;
  settings?: Record<string, any>;
}

export interface MenuItem extends BaseEntity {
  tenant_id: number;
  restaurant_id: number;
  menu_category_id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  cost_price?: number;
  image?: string;
  images?: string[];
  is_available: boolean;
  is_featured: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_spicy: boolean;
  spice_level: number;
  preparation_time?: number;
  calories?: number;
  allergens?: string[];
  ingredients?: string[];
  nutritional_info?: Record<string, any>;
  sort_order: number;
  stock_quantity?: number;
  track_inventory: boolean;
  min_stock_level?: number;
  variants?: Record<string, any>;
  settings?: Record<string, any>;
}

// Order Types
export interface Order extends BaseEntity {
  tenant_id: number;
  restaurant_id: number;
  table_id?: number;
  customer_id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  payment_method: 'cash' | 'card' | 'digital_wallet' | 'bank_transfer';
  subtotal: number;
  tax_amount: number;
  delivery_fee: number;
  total_amount: number;
  delivery_address?: string;
  notes?: string;
  delivered_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  items?: OrderItem[];
}

export interface OrderItem extends BaseEntity {
  tenant_id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  price: number;
  total: number;
  notes?: string;
  menu_item?: MenuItem;
}

// Table Types
export interface TableCategory extends BaseEntity {
  tenant_id: number;
  restaurant_id: number;
  name: string;
  description?: string;
  floor?: string;
  section?: string;
  display_order: number;
  is_active: boolean;
  color?: string;
  icon?: string;
  settings?: Record<string, any>;
}

export interface Table extends BaseEntity {
  tenant_id: number;
  restaurant_id: number;
  category_id?: number;
  name: string;
  number?: string;
  floor?: string;
  section?: string;
  capacity: number;
  table_type?: string;
  status: 'available' | 'occupied' | 'reserved' | 'out_of_service' | 'cleaning';
  position_x?: number;
  position_y?: number;
  shape?: string;
  settings?: Record<string, any>;
  notes?: string;
}

// Analytics Types
export interface DashboardStats {
  total_orders: number;
  pending_orders: number;
  revenue_today: number;
  revenue_this_month: number;
  revenue_growth: number;
  total_customers: number;
  new_customers_today: number;
  average_order_value: number;
  top_selling_items: Array<{
    id: number;
    name: string;
    quantity_sold: number;
    revenue: number;
  }>;
  recent_orders: Order[];
}

export interface RevenueData {
  daily: Array<{
    date: string;
    revenue: number;
  }>;
  monthly: Array<{
    month: string;
    revenue: number;
  }>;
}

// API Request Types
export interface CreateTenantRequest {
  name: string;
  domain?: string;
  subscription_plan: 'basic' | 'professional' | 'enterprise';
  settings?: Record<string, any>;
}

export interface CreateRestaurantRequest {
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  cuisine_type: string;
  price_range: '$' | '$$' | '$$$' | '$$$$';
  business_hours: BusinessHours;
  settings?: Partial<RestaurantSettings>;
}

export interface CreateMenuCategoryRequest {
  name: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
  settings?: Record<string, any>;
}

export interface CreateMenuItemRequest {
  menu_category_id: number;
  name: string;
  description?: string;
  price: number;
  cost_price?: number;
  is_available?: boolean;
  is_featured?: boolean;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_gluten_free?: boolean;
  is_spicy?: boolean;
  spice_level?: number;
  preparation_time?: number;
  calories?: number;
  allergens?: string[];
  ingredients?: string[];
  nutritional_info?: Record<string, any>;
  sort_order?: number;
  stock_quantity?: number;
  track_inventory?: boolean;
  min_stock_level?: number;
  variants?: Record<string, any>;
  settings?: Record<string, any>;
}

export interface CreateOrderRequest {
  restaurant_id: number;
  table_id?: number;
  customer_id: number;
  items: Array<{
    menu_item_id: number;
    quantity: number;
    notes?: string;
  }>;
  notes?: string;
  delivery_address?: string;
}

export interface UpdateOrderStatusRequest {
  status: Order['status'];
  notes?: string;
}

export interface UpdateOrderPaymentRequest {
  payment_status: Order['payment_status'];
  payment_method: Order['payment_method'];
}

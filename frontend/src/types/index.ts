export interface Region {
  id: number;
  name: string;
  slug: string;
  code: string;
  tax_multiplier: number;
  timezone: string;
}

export interface City {
  id: number;
  name: string;
  slug: string;
  region_id: number;
  state: string;
  region_name?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parent_id?: number;
  parent_name?: string;
  position: number;
  children?: Category[];
}

export interface Company {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  cover_url?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  zip_code?: string;
  status: string;
  verified: boolean;
  featured: boolean;
  region_id?: number;
  city_id?: number;
  region_name?: string;
  city_name?: string;
  products_count?: number;
  reviews_count?: number;
  average_rating?: number;
  products?: Product[];
  categories?: Category[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  base_price?: number;
  price_with_discount?: number;
  images?: string[];
  specifications?: Record<string, unknown>;
  highlights?: string[];
  video_url?: string;
  active: boolean;
  featured: boolean;
  category_id: number;
  company_id: number;
  region_id?: number;
  city_id?: number;
  category_name?: string;
  company_name?: string;
  company_logo?: string;
  average_rating?: number;
  reviews_count?: number;
  views_count?: number;
  favorites_count?: number;
}

export interface Review {
  id: number;
  rating: number;
  title?: string;
  comment?: string;
  verified_purchase: boolean;
  status: string;
  company_response?: boolean;
  company_response_text?: string;
  company_response_at?: string;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company_id: number;
  company_name?: string;
  region_id?: number;
  city_id?: number;
  source?: string;
  intent_score: number;
  funnel_stage: string;
  qualification_status: string;
  status: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface QuoteRequest {
  id: number;
  user_id?: number;
  product_id: number;
  company_id: number;
  lead_id?: number;
  message?: string;
  budget_min?: number;
  budget_max?: number;
  timeline?: string;
  intent_score: number;
  status: string;
  response_message?: string;
  quoted_price?: number;
  converted: boolean;
  converted_at?: string;
  created_at: string;
  user_name?: string;
  product_name?: string;
  company_name?: string;
}

export interface Plan {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price_monthly?: number;
  price_yearly?: number;
  features?: string[];
  limits?: Record<string, number>;
  highlighted: boolean;
  active: boolean;
  position: number;
}

export interface Subscription {
  id: number;
  status: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  billing_cycle: string;
  current_period_start?: string;
  current_period_end?: string;
  canceled_at?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  plan_name?: string;
  plan_price?: number;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  avatar_url?: string;
  document?: string;
  birth_date?: string;
  gender?: string;
  address?: string;
  zip_code?: string;
  region_id?: number;
  city_id?: number;
  region_name?: string;
  city_name?: string;
  newsletter: boolean;
  created_at: string;
  subscription?: Subscription;
  company?: Company;
}

export interface AdPlacement {
  id: number;
  position_key: string;
  page: string;
  location: string;
  width?: number;
  height?: number;
  price_cents?: number;
  description?: string;
  active: boolean;
}

export interface AdBanner {
  id: number;
  name?: string;
  image_url: string;
  target_url: string;
  alt_text?: string;
  impressions_limit?: number;
  impressions_count?: number;
  clicks_count?: number;
  priority: number;
  active: boolean;
  approved: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    current_page?: number;
    next_page?: number;
    prev_page?: number;
    total_pages?: number;
    total_count?: number;
  };
}

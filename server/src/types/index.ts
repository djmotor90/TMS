export interface Organization {
  id: string;
  name: string;
  domain: string;
  description?: string;
  contact_email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country: string;
  timezone: string;
  subscription_plan: string;
  is_active: boolean;
  settings: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  organization_id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'admin' | 'manager' | 'dispatcher' | 'driver' | 'user';
  permissions: string[];
  is_active: boolean;
  email_verified: boolean;
  last_login?: Date;
  reset_token?: string;
  reset_token_expires?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Vehicle {
  id: string;
  organization_id: string;
  vehicle_number: string;
  license_plate: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  vehicle_type: string;
  status: 'available' | 'in_transit' | 'maintenance' | 'out_of_service';
  capacity_weight?: number;
  capacity_volume?: number;
  fuel_type: string;
  fuel_efficiency?: number;
  notes?: string;
  specifications: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Driver {
  id: string;
  organization_id: string;
  user_id?: string;
  driver_code: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  license_number: string;
  license_class: string;
  license_expiry: Date;
  status: 'available' | 'on_duty' | 'off_duty' | 'driving';
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  hire_date?: Date;
  birth_date?: Date;
  notes?: string;
  certifications: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Customer {
  id: string;
  organization_id: string;
  customer_code: string;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  billing_address?: string;
  billing_city?: string;
  billing_state?: string;
  billing_postal_code?: string;
  billing_country: string;
  payment_terms: string;
  credit_limit: number;
  is_active: boolean;
  notes?: string;
  custom_fields: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Shipment {
  id: string;
  organization_id: string;
  customer_id: string;
  shipment_number: string;
  po_number?: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  service_type: string;
  total_weight?: number;
  total_volume?: number;
  total_pieces?: number;
  description?: string;
  declared_value?: number;
  hazmat: boolean;
  special_instructions?: string;
  pickup_date?: Date;
  delivery_date?: Date;
  requested_pickup_date?: Date;
  requested_delivery_date?: Date;
  rate?: number;
  fuel_surcharge: number;
  accessorial_charges: number;
  total_amount?: number;
  notes?: string;
  custom_fields: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface ShipmentLocation {
  id: string;
  shipment_id: string;
  type: 'pickup' | 'delivery' | 'stop';
  sequence_order: number;
  company_name?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
  scheduled_date?: Date;
  actual_date?: Date;
  status: 'pending' | 'arrived' | 'completed' | 'failed';
  special_instructions?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Load {
  id: string;
  organization_id: string;
  driver_id?: string;
  vehicle_id?: string;
  load_number: string;
  status: 'planning' | 'dispatched' | 'in_transit' | 'delivered' | 'completed';
  planned_start_date?: Date;
  planned_end_date?: Date;
  actual_start_date?: Date;
  actual_end_date?: Date;
  total_miles?: number;
  total_revenue?: number;
  total_cost?: number;
  route_notes?: string;
  route_details: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface TrackingEvent {
  id: string;
  shipment_id?: string;
  load_id?: string;
  event_type: string;
  status: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  location_name?: string;
  event_timestamp: Date;
  created_by?: string;
  notes?: string;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
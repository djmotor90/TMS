export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'dispatcher' | 'driver' | 'user';
  organizationId: string;
  organizationName: string;
  domain: string;
  permissions?: string[];
  lastLogin?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
  description?: string;
  contactEmail: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: string;
  timezone: string;
  subscriptionPlan: string;
  isActive: boolean;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  organizationId: string;
  vehicleNumber: string;
  licensePlate: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  vehicleType: string;
  status: 'available' | 'in_transit' | 'maintenance' | 'out_of_service';
  capacityWeight?: number;
  capacityVolume?: number;
  fuelType: string;
  fuelEfficiency?: number;
  notes?: string;
  specifications: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  organizationId: string;
  userId?: string;
  driverCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  licenseNumber: string;
  licenseClass: string;
  licenseExpiry: string;
  status: 'available' | 'on_duty' | 'off_duty' | 'driving';
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  hireDate?: string;
  birthDate?: string;
  notes?: string;
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  organizationId: string;
  customerCode: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingCountry: string;
  paymentTerms: string;
  creditLimit: number;
  isActive: boolean;
  notes?: string;
  customFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Shipment {
  id: string;
  organizationId: string;
  customerId: string;
  customerName?: string;
  shipmentNumber: string;
  poNumber?: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  serviceType: string;
  totalWeight?: number;
  totalVolume?: number;
  totalPieces?: number;
  description?: string;
  declaredValue?: number;
  hazmat: boolean;
  specialInstructions?: string;
  pickupDate?: string;
  deliveryDate?: string;
  requestedPickupDate?: string;
  requestedDeliveryDate?: string;
  rate?: number;
  fuelSurcharge: number;
  accessorialCharges: number;
  totalAmount?: number;
  notes?: string;
  customFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  fleet: {
    totalVehicles: number;
    availableVehicles: number;
    totalDrivers: number;
    availableDrivers: number;
  };
  shipments: {
    active: number;
    recent: Shipment[];
  };
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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  organizationName: string;
  domain: string;
  adminEmail: string;
  adminPassword: string;
  firstName: string;
  lastName: string;
}
import { Knex } from "knex";
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    // Clear existing data
    await knex('tracking_events').del();
    await knex('load_shipments').del();
    await knex('shipment_locations').del();
    await knex('shipments').del();
    await knex('loads').del();
    await knex('customers').del();
    await knex('drivers').del();
    await knex('vehicles').del();
    await knex('users').del();
    await knex('organizations').del();

    // Insert sample organization
    const [organization] = await knex('organizations').insert([
        {
            name: 'Demo Transportation Co.',
            domain: 'demo',
            description: 'A sample transportation company for demonstration',
            contact_email: 'admin@demo.com',
            phone: '+1-555-0123',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'US',
            timezone: 'America/New_York',
            subscription_plan: 'premium',
            is_active: true,
            settings: JSON.stringify({
                emailNotifications: true,
                smsNotifications: false,
                realTimeTracking: true,
                autoDispatch: false
            })
        }
    ]).returning('*');

    // Hash password for sample users
    const passwordHash = await bcrypt.hash('demo123', 10);

    // Insert sample users
    const users = await knex('users').insert([
        {
            organization_id: organization.id,
            email: 'admin@demo.com',
            password_hash: passwordHash,
            first_name: 'John',
            last_name: 'Admin',
            phone: '+1-555-0101',
            role: 'admin',
            is_active: true,
            email_verified: true
        },
        {
            organization_id: organization.id,
            email: 'manager@demo.com',
            password_hash: passwordHash,
            first_name: 'Jane',
            last_name: 'Manager',
            phone: '+1-555-0102',
            role: 'manager',
            is_active: true,
            email_verified: true
        },
        {
            organization_id: organization.id,
            email: 'dispatcher@demo.com',
            password_hash: passwordHash,
            first_name: 'Mike',
            last_name: 'Dispatcher',
            phone: '+1-555-0103',
            role: 'dispatcher',
            is_active: true,
            email_verified: true
        }
    ]).returning('*');

    // Insert sample vehicles
    await knex('vehicles').insert([
        {
            organization_id: organization.id,
            vehicle_number: 'TRK-001',
            license_plate: 'ABC-123',
            vin: '1HGBH41JXMN109186',
            make: 'Freightliner',
            model: 'Cascadia',
            year: 2022,
            vehicle_type: 'Semi Truck',
            status: 'available',
            capacity_weight: 80000,
            capacity_volume: 3000,
            fuel_type: 'diesel',
            fuel_efficiency: 6.5,
            specifications: JSON.stringify({
                engine: 'Detroit DD15',
                transmission: 'DT12 Automated',
                axles: '6x4'
            })
        },
        {
            organization_id: organization.id,
            vehicle_number: 'TRK-002',
            license_plate: 'XYZ-456',
            vin: '1HGBH41JXMN109187',
            make: 'Peterbilt',
            model: '579',
            year: 2021,
            vehicle_type: 'Semi Truck',
            status: 'in_transit',
            capacity_weight: 80000,
            capacity_volume: 3000,
            fuel_type: 'diesel',
            fuel_efficiency: 6.2,
            specifications: JSON.stringify({
                engine: 'Paccar MX-13',
                transmission: '18-Speed Manual',
                axles: '6x4'
            })
        },
        {
            organization_id: organization.id,
            vehicle_number: 'VAN-001',
            license_plate: 'DEF-789',
            vin: '1HGBH41JXMN109188',
            make: 'Ford',
            model: 'Transit',
            year: 2023,
            vehicle_type: 'Cargo Van',
            status: 'available',
            capacity_weight: 4650,
            capacity_volume: 487,
            fuel_type: 'gasoline',
            fuel_efficiency: 14.8,
            specifications: JSON.stringify({
                engine: '3.5L V6',
                transmission: '10-Speed Automatic',
                wheelbase: '148"'
            })
        }
    ]);

    // Insert sample drivers
    await knex('drivers').insert([
        {
            organization_id: organization.id,
            driver_code: 'DRV-001',
            first_name: 'Robert',
            last_name: 'Johnson',
            phone: '+1-555-0201',
            email: 'robert.johnson@demo.com',
            license_number: 'CDL123456',
            license_class: 'Class A CDL',
            license_expiry: '2025-12-31',
            status: 'available',
            address: '456 Oak Avenue',
            city: 'Brooklyn',
            state: 'NY',
            postal_code: '11201',
            hire_date: '2020-03-15',
            birth_date: '1985-07-20',
            certifications: JSON.stringify(['HAZMAT', 'Doubles/Triples'])
        },
        {
            organization_id: organization.id,
            driver_code: 'DRV-002',
            first_name: 'Maria',
            last_name: 'Garcia',
            phone: '+1-555-0202',
            email: 'maria.garcia@demo.com',
            license_number: 'CDL789012',
            license_class: 'Class A CDL',
            license_expiry: '2026-06-30',
            status: 'driving',
            address: '789 Pine Street',
            city: 'Queens',
            state: 'NY',
            postal_code: '11105',
            hire_date: '2019-11-08',
            birth_date: '1988-03-12',
            certifications: JSON.stringify(['HAZMAT', 'Passenger'])
        },
        {
            organization_id: organization.id,
            driver_code: 'DRV-003',
            first_name: 'David',
            last_name: 'Smith',
            phone: '+1-555-0203',
            email: 'david.smith@demo.com',
            license_number: 'REG345678',
            license_class: 'Class C',
            license_expiry: '2024-09-15',
            status: 'available',
            address: '321 Elm Street',
            city: 'Manhattan',
            state: 'NY',
            postal_code: '10002',
            hire_date: '2022-01-10',
            birth_date: '1992-11-05',
            certifications: JSON.stringify([])
        }
    ]);

    // Insert sample customers
    const customers = await knex('customers').insert([
        {
            organization_id: organization.id,
            customer_code: 'CUST-001',
            name: 'ABC Manufacturing',
            contact_person: 'Jennifer White',
            email: 'jwhite@abcmfg.com',
            phone: '+1-555-0301',
            billing_address: '100 Industrial Blvd',
            billing_city: 'Newark',
            billing_state: 'NJ',
            billing_postal_code: '07102',
            billing_country: 'US',
            payment_terms: 'NET30',
            credit_limit: 50000,
            is_active: true,
            notes: 'Preferred customer with excellent payment history'
        },
        {
            organization_id: organization.id,
            customer_code: 'CUST-002',
            name: 'XYZ Logistics',
            contact_person: 'Tom Brown',
            email: 'tbrown@xyzlog.com',
            phone: '+1-555-0302',
            billing_address: '200 Commerce Way',
            billing_city: 'Philadelphia',
            billing_state: 'PA',
            billing_postal_code: '19103',
            billing_country: 'US',
            payment_terms: 'NET15',
            credit_limit: 75000,
            is_active: true,
            notes: 'Large volume customer, priority handling'
        }
    ]).returning('*');

    // Insert sample shipments
    const shipments = await knex('shipments').insert([
        {
            organization_id: organization.id,
            customer_id: customers[0].id,
            shipment_number: 'SHP-001',
            po_number: 'PO-ABC-2023-001',
            status: 'in_transit',
            service_type: 'LTL',
            total_weight: 5500,
            total_volume: 280,
            total_pieces: 12,
            description: 'Electronic components and accessories',
            declared_value: 25000,
            hazmat: false,
            special_instructions: 'Handle with care - fragile items',
            requested_pickup_date: '2023-12-01 09:00:00',
            requested_delivery_date: '2023-12-03 17:00:00',
            rate: 850,
            fuel_surcharge: 45,
            accessorial_charges: 75,
            total_amount: 970
        },
        {
            organization_id: organization.id,
            customer_id: customers[1].id,
            shipment_number: 'SHP-002',
            po_number: 'PO-XYZ-2023-045',
            status: 'pending',
            service_type: 'FTL',
            total_weight: 35000,
            total_volume: 2400,
            total_pieces: 48,
            description: 'Automotive parts and supplies',
            declared_value: 120000,
            hazmat: false,
            special_instructions: 'Appointment required for delivery',
            requested_pickup_date: '2023-12-05 08:00:00',
            requested_delivery_date: '2023-12-07 16:00:00',
            rate: 1850,
            fuel_surcharge: 125,
            accessorial_charges: 150,
            total_amount: 2125
        }
    ]).returning('*');

    // Insert shipment locations
    await knex('shipment_locations').insert([
        {
            shipment_id: shipments[0].id,
            type: 'pickup',
            sequence_order: 1,
            company_name: 'ABC Manufacturing',
            contact_person: 'Jennifer White',
            phone: '+1-555-0301',
            address: '100 Industrial Blvd',
            city: 'Newark',
            state: 'NJ',
            postal_code: '07102',
            country: 'US',
            scheduled_date: '2023-12-01 09:00:00',
            status: 'completed'
        },
        {
            shipment_id: shipments[0].id,
            type: 'delivery',
            sequence_order: 2,
            company_name: 'Tech Solutions Inc',
            contact_person: 'Mark Davis',
            phone: '+1-555-0401',
            address: '500 Tech Park Drive',
            city: 'Boston',
            state: 'MA',
            postal_code: '02101',
            country: 'US',
            scheduled_date: '2023-12-03 17:00:00',
            status: 'pending'
        }
    ]);

    console.log('Sample data seeded successfully!');
}
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('shipments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.uuid('customer_id').references('id').inTable('customers').onDelete('CASCADE');
    table.string('shipment_number').notNullable();
    table.string('po_number');
    table.string('status').defaultTo('pending'); // pending, assigned, in_transit, delivered, cancelled
    table.string('service_type').notNullable(); // LTL, FTL, expedited, etc.
    table.decimal('total_weight', 10, 2);
    table.decimal('total_volume', 10, 2);
    table.integer('total_pieces');
    table.text('description');
    table.decimal('declared_value', 12, 2);
    table.boolean('hazmat').defaultTo(false);
    table.string('special_instructions');
    table.timestamp('pickup_date');
    table.timestamp('delivery_date');
    table.timestamp('requested_pickup_date');
    table.timestamp('requested_delivery_date');
    table.decimal('rate', 10, 2);
    table.decimal('fuel_surcharge', 10, 2).defaultTo(0);
    table.decimal('accessorial_charges', 10, 2).defaultTo(0);
    table.decimal('total_amount', 12, 2);
    table.text('notes');
    table.jsonb('custom_fields').defaultTo('{}');
    table.timestamps(true, true);
    
    // Composite unique constraint for shipment_number within organization
    table.unique(['organization_id', 'shipment_number']);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['customer_id']);
    table.index(['status']);
    table.index(['pickup_date']);
    table.index(['delivery_date']);
    table.index(['service_type']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('shipments');
}
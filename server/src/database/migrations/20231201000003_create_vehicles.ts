import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('vehicles', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.string('vehicle_number').notNullable();
    table.string('license_plate').notNullable();
    table.string('vin');
    table.string('make');
    table.string('model');
    table.integer('year');
    table.string('vehicle_type').notNullable(); // truck, trailer, van, etc.
    table.string('status').defaultTo('available'); // available, in_transit, maintenance, out_of_service
    table.decimal('capacity_weight', 10, 2);
    table.decimal('capacity_volume', 10, 2);
    table.string('fuel_type').defaultTo('diesel');
    table.decimal('fuel_efficiency', 8, 2);
    table.text('notes');
    table.jsonb('specifications').defaultTo('{}');
    table.timestamps(true, true);
    
    // Composite unique constraint for vehicle_number within organization
    table.unique(['organization_id', 'vehicle_number']);
    table.unique(['organization_id', 'license_plate']);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['status']);
    table.index(['vehicle_type']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('vehicles');
}
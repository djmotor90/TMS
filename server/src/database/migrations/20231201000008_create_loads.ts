import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('loads', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.uuid('driver_id').references('id').inTable('drivers').onDelete('SET NULL').nullable();
    table.uuid('vehicle_id').references('id').inTable('vehicles').onDelete('SET NULL').nullable();
    table.string('load_number').notNullable();
    table.string('status').defaultTo('planning'); // planning, dispatched, in_transit, delivered, completed
    table.timestamp('planned_start_date');
    table.timestamp('planned_end_date');
    table.timestamp('actual_start_date');
    table.timestamp('actual_end_date');
    table.decimal('total_miles', 8, 2);
    table.decimal('total_revenue', 12, 2);
    table.decimal('total_cost', 12, 2);
    table.text('route_notes');
    table.jsonb('route_details').defaultTo('{}');
    table.timestamps(true, true);
    
    // Composite unique constraint for load_number within organization
    table.unique(['organization_id', 'load_number']);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['driver_id']);
    table.index(['vehicle_id']);
    table.index(['status']);
    table.index(['planned_start_date']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('loads');
}
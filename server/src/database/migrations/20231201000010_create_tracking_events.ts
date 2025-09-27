import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tracking_events', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('shipment_id').references('id').inTable('shipments').onDelete('CASCADE').nullable();
    table.uuid('load_id').references('id').inTable('loads').onDelete('CASCADE').nullable();
    table.string('event_type').notNullable(); // pickup, delivery, in_transit, delay, exception
    table.string('status').notNullable();
    table.text('description');
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.string('location_name');
    table.timestamp('event_timestamp').notNullable();
    table.uuid('created_by').references('id').inTable('users').onDelete('SET NULL').nullable();
    table.text('notes');
    table.jsonb('metadata').defaultTo('{}');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['shipment_id']);
    table.index(['load_id']);
    table.index(['event_type']);
    table.index(['event_timestamp']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tracking_events');
}
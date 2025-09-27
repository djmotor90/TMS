import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('load_shipments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('load_id').references('id').inTable('loads').onDelete('CASCADE');
    table.uuid('shipment_id').references('id').inTable('shipments').onDelete('CASCADE');
    table.integer('pickup_sequence');
    table.integer('delivery_sequence');
    table.timestamps(true, true);
    
    // Ensure a shipment can only be on one load at a time
    table.unique(['shipment_id']);
    
    // Indexes
    table.index(['load_id']);
    table.index(['shipment_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('load_shipments');
}
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('documents', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.uuid('shipment_id').references('id').inTable('shipments').onDelete('CASCADE').nullable();
    table.uuid('load_id').references('id').inTable('loads').onDelete('CASCADE').nullable();
    table.uuid('driver_id').references('id').inTable('drivers').onDelete('CASCADE').nullable();
    table.uuid('vehicle_id').references('id').inTable('vehicles').onDelete('CASCADE').nullable();
    table.string('document_type').notNullable(); // BOL, POD, invoice, receipt, etc.
    table.string('file_name').notNullable();
    table.string('file_path').notNullable();
    table.string('mime_type');
    table.integer('file_size');
    table.uuid('uploaded_by').references('id').inTable('users').onDelete('SET NULL').nullable();
    table.text('description');
    table.jsonb('metadata').defaultTo('{}');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['shipment_id']);
    table.index(['load_id']);
    table.index(['document_type']);
    table.index(['uploaded_by']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('documents');
}
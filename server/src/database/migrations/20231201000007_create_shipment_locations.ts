import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('shipment_locations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('shipment_id').references('id').inTable('shipments').onDelete('CASCADE');
    table.string('type').notNullable(); // pickup, delivery, stop
    table.integer('sequence_order').notNullable();
    table.string('company_name');
    table.string('contact_person');
    table.string('phone');
    table.string('email');
    table.text('address').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('postal_code').notNullable();
    table.string('country').defaultTo('US');
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.timestamp('scheduled_date');
    table.timestamp('actual_date');
    table.string('status').defaultTo('pending'); // pending, arrived, completed, failed
    table.text('special_instructions');
    table.text('notes');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['shipment_id']);
    table.index(['type']);
    table.index(['status']);
    table.index(['scheduled_date']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('shipment_locations');
}
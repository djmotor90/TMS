import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('organizations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('domain').unique().notNullable();
    table.text('description');
    table.string('contact_email').notNullable();
    table.string('phone');
    table.text('address');
    table.string('city');
    table.string('state');
    table.string('postal_code');
    table.string('country').defaultTo('US');
    table.string('timezone').defaultTo('America/New_York');
    table.string('subscription_plan').defaultTo('basic');
    table.boolean('is_active').defaultTo(true);
    table.jsonb('settings').defaultTo('{}');
    table.timestamps(true, true);
    
    // Indexes
    table.index(['domain']);
    table.index(['is_active']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('organizations');
}
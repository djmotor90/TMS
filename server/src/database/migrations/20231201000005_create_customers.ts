import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('customers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.string('customer_code').notNullable();
    table.string('name').notNullable();
    table.string('contact_person');
    table.string('email');
    table.string('phone');
    table.text('billing_address');
    table.string('billing_city');
    table.string('billing_state');
    table.string('billing_postal_code');
    table.string('billing_country').defaultTo('US');
    table.string('payment_terms').defaultTo('NET30');
    table.decimal('credit_limit', 12, 2).defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.text('notes');
    table.jsonb('custom_fields').defaultTo('{}');
    table.timestamps(true, true);
    
    // Composite unique constraint for customer_code within organization
    table.unique(['organization_id', 'customer_code']);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['is_active']);
    table.index(['name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('customers');
}
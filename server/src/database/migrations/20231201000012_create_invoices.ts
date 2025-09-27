import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('invoices', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.uuid('customer_id').references('id').inTable('customers').onDelete('CASCADE');
    table.string('invoice_number').notNullable();
    table.string('status').defaultTo('draft'); // draft, sent, paid, overdue, cancelled
    table.date('invoice_date').notNullable();
    table.date('due_date').notNullable();
    table.decimal('subtotal', 12, 2).notNullable();
    table.decimal('tax_amount', 12, 2).defaultTo(0);
    table.decimal('total_amount', 12, 2).notNullable();
    table.decimal('paid_amount', 12, 2).defaultTo(0);
    table.decimal('balance_due', 12, 2).notNullable();
    table.string('payment_terms').defaultTo('NET30');
    table.text('notes');
    table.timestamps(true, true);
    
    // Composite unique constraint for invoice_number within organization
    table.unique(['organization_id', 'invoice_number']);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['customer_id']);
    table.index(['status']);
    table.index(['due_date']);
    table.index(['invoice_date']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('invoices');
}
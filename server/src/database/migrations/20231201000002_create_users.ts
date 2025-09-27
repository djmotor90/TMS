import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.string('email').notNullable();
    table.string('password_hash').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone');
    table.string('role').notNullable().defaultTo('user'); // admin, manager, dispatcher, driver, user
    table.jsonb('permissions').defaultTo('[]');
    table.boolean('is_active').defaultTo(true);
    table.boolean('email_verified').defaultTo(false);
    table.timestamp('last_login');
    table.string('reset_token');
    table.timestamp('reset_token_expires');
    table.timestamps(true, true);
    
    // Composite unique constraint for email within organization
    table.unique(['organization_id', 'email']);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['email']);
    table.index(['role']);
    table.index(['is_active']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
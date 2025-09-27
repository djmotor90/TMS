import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('drivers', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('organization_id').references('id').inTable('organizations').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL').nullable();
    table.string('driver_code').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone').notNullable();
    table.string('email');
    table.string('license_number').notNullable();
    table.string('license_class').notNullable();
    table.date('license_expiry').notNullable();
    table.string('status').defaultTo('available'); // available, on_duty, off_duty, driving
    table.text('address');
    table.string('city');
    table.string('state');
    table.string('postal_code');
    table.date('hire_date');
    table.date('birth_date');
    table.text('notes');
    table.jsonb('certifications').defaultTo('[]');
    table.timestamps(true, true);
    
    // Composite unique constraint for driver_code within organization
    table.unique(['organization_id', 'driver_code']);
    table.unique(['organization_id', 'license_number']);
    
    // Indexes
    table.index(['organization_id']);
    table.index(['status']);
    table.index(['license_expiry']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('drivers');
}
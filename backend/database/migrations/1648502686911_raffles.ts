import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Raffles extends BaseSchema {
  protected tableName = 'raffles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.date('completion_date').notNullable();
      table.integer('numbers_available').notNullable()
      table.integer('price').notNullable()
      table.string('status').notNullable()
      // table
      // .integer('product_id')
      // .unsigned()
      // .references('products.id')
      // .onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

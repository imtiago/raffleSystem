import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RaffleProducts extends BaseSchema {
  protected tableName = 'raffle_product'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid('raffle_id').references('raffles.id')
      table.uuid('product_id').references('products.id')
      table.integer('quantity').notNullable()
      table.unique(['product_id', 'raffle_id'])
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // table.timestamp('created_at', { useTz: true })
      // table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

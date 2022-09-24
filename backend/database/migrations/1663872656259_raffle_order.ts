import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RaffleOrders extends BaseSchema {
  protected tableName = 'raffle_order'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('raffle_id').references('raffles.id')
      table.uuid('order_id').references('orders.id')
      table.integer('quantity').notNullable()
      table.unique(['order_id', 'raffle_id'])
      
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

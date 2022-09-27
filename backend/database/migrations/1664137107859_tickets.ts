import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('code').nullable()
      table.uuid('raffle_id').references('id').inTable('raffles').onDelete('CASCADE')
      // table.uuid('raffle_order_id').references('id').inTable('raffle_order').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
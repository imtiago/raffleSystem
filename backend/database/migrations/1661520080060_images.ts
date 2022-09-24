import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Image extends BaseSchema {
  protected tableName = 'images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').nullable()
      table.string('url').notNullable()
      table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Addresses extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
    //   table.string('cep').notNullable()
    //   table.string('logradouro').nullable()
    //   table.string('number').nullable()
    //   table.string('neighborhood').nullable()
    //   table.string('city').nullable()
    //   table.string('uf').notNullable()
    //   table.string('complement').nullable()
    //   table
    //     .uuid('user_id')
    //     .references('users.id')
    //     .onDelete('CASCADE')
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

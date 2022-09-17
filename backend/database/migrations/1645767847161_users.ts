import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('cpf').nullable()
      table.string('rg').nullable()
      table.date('birth_day').nullable()
      table.string('email', 255).notNullable().unique()
      table.string('phone', 15).notNullable().unique()
      table.string('password', 180).notNullable()
      table.enu('status', ['PENDENTE', 'ATIVO'], {
        useNative: true,
        enumName: 'user_status',
        existingType: false,
      })
      table.string('avatar_url').nullable()
      table.string('qr_code_url').nullable()
      table.string('remember_me_token').nullable()

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

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IndicationCodes extends BaseSchema {
  protected tableName = 'indication_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('indication_code_received',50).nullable()
      table.string('indication_code',50).notNullable()
      table.string('qr_code').nullable()
      table.uuid('user_id').references('id').inTable('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

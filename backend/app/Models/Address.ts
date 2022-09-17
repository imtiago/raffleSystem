import { DateTime } from 'luxon'
import { beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'

// export default class Address extends BaseModel {
export default class Address extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public cep: string

  @column()
  public logradouro: string
  
  @column()
  public number: number

  @column()
  public neighborhood: string
  
  @column()
  public city: string

  @column()
  public uf: string
  
  @column()
  public complement: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User)
  public posts: HasMany<typeof User>
  
  //hooks
  @beforeCreate()
  public static assignUuid(address: Address) {
    address.id = uuidv4()
  }
}

import { DateTime } from 'luxon'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import AppBaseModel from './AppBaseModel'
import { v4 as uuidv4 } from 'uuid'
import { beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'


export default class Wallet extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: string

  @column()
  public balance: number

  @column()
  public pixKey: string

  @column()
  public userId: string
  
  @column.dateTime({ autoCreate: true, serializeAs: null})
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null})
  public updatedAt: DateTime
  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

   //hooks
   @beforeCreate()
   public static assignUuid(wallet: Wallet) {
    wallet.id = uuidv4()
    wallet.balance = 0
   }
}
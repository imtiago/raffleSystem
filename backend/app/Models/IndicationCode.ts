import {  BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import AppBaseModel from './AppBaseModel'
import User from './User'


export default class IndicationCode extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public indicationCodeReceived: string

  @column()
  public indicationCode: string
  
  @column()
  public qrCode: string

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

}

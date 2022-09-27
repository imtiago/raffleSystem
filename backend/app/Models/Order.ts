import { DateTime } from 'luxon'
import { beforeCreate, BelongsTo, belongsTo, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'
import Raffle from './Raffle'
import User from './User'
import { EnumStatusOrder } from 'App/utils/Enums'

export default class Order extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public value: number

  @column()
  public status: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
  
  @manyToMany(() => Raffle,{
    pivotColumns: ['code'],
    pivotTable: 'tickets'
  })
  public tickets: ManyToMany<typeof Raffle>

  @manyToMany(() => Raffle,{
    pivotColumns: ['quantity'],
    pivotTable: 'raffle_order'
  })
  public raffles: ManyToMany<typeof Raffle>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  
  //hooks
  @beforeCreate()
  public static assignUuid(order: Order) {
    order.id = uuidv4()
    order.status = EnumStatusOrder.AWAITING_PAYMENT.status
  }
}

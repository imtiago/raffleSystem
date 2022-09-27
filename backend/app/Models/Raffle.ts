import { DateTime } from 'luxon'
import { beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'
import Order from './Order'
import { EnumStatusRaffle } from 'App/utils/Enums'

// export default class Raffle extends BaseModel {
export default class Raffle extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public numbersAvailable: number
  
  @column()
  public price: number

  @column()
  public status: string
  
  @column.dateTime()
  public completionDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @manyToMany(() => Product,{
    pivotTable: 'raffle_product'
  })
  public products: ManyToMany<typeof Product>

  @manyToMany(() => Order,{
    pivotTable: 'raffle_order'
  })
  public orders: ManyToMany<typeof Order>
  
  //hooks
  @beforeCreate()
  public static assignUuidAndStatus(raffle: Raffle) {
    raffle.id = uuidv4()
    raffle.status = EnumStatusRaffle.pending.status
  }
}

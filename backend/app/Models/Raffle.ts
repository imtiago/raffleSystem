import { DateTime } from 'luxon'
import { beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'

// export default class Raffle extends BaseModel {
export default class Raffle extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string
  
  @column()
  public numbers_available: number
  
  @column()
  public product_id: number
  
  @column.dateTime()
  public completion_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>
  
  //hooks
  @beforeCreate()
  public static assignUuid(raffle: Raffle) {
    raffle.id = uuidv4()
  }
}

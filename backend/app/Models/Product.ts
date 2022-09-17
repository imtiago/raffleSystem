import { DateTime } from 'luxon'
import { beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Raffle from './Raffle'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'

// export default class Product extends BaseModel {
export default class Product extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string
  
  @column()
  public price: number
  
  @column()
  public details: string
  
  @column()
  public new: boolean
  
  @column()
  public link: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @manyToMany(() => Raffle)
  public raffles: ManyToMany<typeof Raffle>
  
  //hooks
  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuidv4()
  }

  // @beforeSave()
  // public static formatPriceToInt(product: Product) {
  //   if (product.$dirty.price) {
  //     product.price = product.price * 100
  //   }
  // }

  // @afterFind()
  // public static formatPriceToFloat(product: Product) {
  //     product.price = product.price / 100
  // }

}

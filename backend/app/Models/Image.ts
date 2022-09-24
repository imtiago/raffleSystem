import { beforeCreate, belongsTo, BelongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'
import Product from './Product'

// export default class Product extends BaseModel {
export default class Image extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string
  
  @column()
  public url: string

  @column()
  public productId: string
  
  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
  
  //hooks
  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuidv4()
  }
}

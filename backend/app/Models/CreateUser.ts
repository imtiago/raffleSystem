import { DateTime } from 'luxon'
import { beforeCreate, beforeSave, column, computed} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import AppBaseModel from './AppBaseModel'

// export default class User extends BaseModel {
export default class CreateUser extends AppBaseModel {
  public static table = 'users'
  public static selfAssignPrimaryKey = true
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: string
  
  @column()
  public firstName: string

  @column()
  public lastName: string
  
  @column()
  public email: string

  @column()
  public phone: string

  @column({})
  public status: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  //Computer Props
  @computed()
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  //hooks
  @beforeCreate()
  public static assignUuid(user: CreateUser) {
    user.id = uuidv4()
  }

  @beforeCreate()
  public static assignStatus(user: CreateUser) {
    user.status = "PENDENTE"
  }

  @beforeSave()
  public static async hashPassword (user: CreateUser) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
} 
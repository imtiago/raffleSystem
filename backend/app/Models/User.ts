import { DateTime } from 'luxon'
import { afterCreate, beforeCreate, beforeSave, column, computed, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid'
import Role from './Role'
import Permission from './Permission'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import AppBaseModel from './AppBaseModel'
import Order from './Order'
import IndicationCode from './IndicationCode'
import makeCode from 'App/utils/RandomCode'
import { EnumStatusUser } from 'App/utils/Enums'
import Wallet from './Wallet'

// import Address from './Address'

// export default class User extends BaseModel {
export default class User extends AppBaseModel {
  public static selfAssignPrimaryKey = true
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: string
  
  @column()
  public firstName: string

  @column()
  public lastName: string
  
  @column()
  public avatarUrl: string

  @column()
  public qrCodeUrl: string
  
  @column()
  public cpf: string

  @column()
  public phone: string

  @column()
  public rg: string

  @column()
  public email: string

  @column()
  public status: string

  @column.date()
  public birthDay: DateTime

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'role_user',
    pivotTimestamps: true
  })
  public roles: ManyToMany<typeof Role>

  @manyToMany(() =>Permission, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id',
    pivotTable: 'permission_user',
    pivotTimestamps: true
  })
  public permissions: ManyToMany<typeof Permission>
  
  @hasMany(() => Order)
  public orders: HasMany<typeof Order>

  @hasOne(() => Wallet)
  public wallet: HasOne<typeof Wallet>

  @hasOne(() => IndicationCode)
  public indicationCode: HasOne<typeof IndicationCode>

  //Computer Props
  @computed()
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  //hooks
  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
    user.status = EnumStatusUser.inactive.status
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterCreate()
  public static async assignIndicationCode (user: User) {
    const role = await Role.findByOrFail("name", "ROLE_ASSOCIATE");
    await user.related("roles").saveMany([role]);
    await user.related('wallet').create({
    })
    await user.related('indicationCode').create({
      indicationCode: `${user.firstName}_${makeCode(5)}`
    })
  }
} 
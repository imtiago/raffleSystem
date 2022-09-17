import { DateTime } from 'luxon'
import { beforeCreate, beforeSave, column, computed, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid'
import Role from './Role'
import Permission from './Permission'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import AppBaseModel from './AppBaseModel'

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

  //Computer Props
  @computed()
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  // @computed()
  // public get age(): number {
  //   return Math.abs(Math.round(this.birthDay.diffNow('years').years));
  // }
  // @belongsTo(()=> Address )
  // public address: BelongsTo<typeOf Address>

  //hooks
  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // static get traits () {
  //   return [
  //     '@provider:Adonis/Acl/HasRole',
  //     '@provider:Adonis/Acl/HasPermission'
  //   ]
  // }
} 
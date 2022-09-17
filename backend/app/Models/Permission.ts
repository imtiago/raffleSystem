import { DateTime } from 'luxon'
import { beforeCreate, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Role from './Role'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'


// export default class Permission extends BaseModel {
export default class Permission extends AppBaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string
  
  @column()
  public name: string

  @column()
  public description: string

  @column()
  public label: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'permission_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'permission_user',
    pivotTimestamps: true
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'permission_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'permission_role',
    pivotTimestamps: true
  })
  public roles: ManyToMany<typeof Role>

  //hooks
  @beforeCreate()
  public static assignUuid(permission: Permission) {
    permission.id = uuidv4()
  }
}

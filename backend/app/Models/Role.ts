import { DateTime } from 'luxon'
import { beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Permission from './Permission'
import { v4 as uuidv4 } from 'uuid'
import AppBaseModel from './AppBaseModel'


// export default class Role extends BaseModel {
export default class Role extends AppBaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public label: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'role_user',
    pivotTimestamps: true
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Permission, {
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id',
    pivotTable: 'permission_role',
    pivotTimestamps: true
  })
  public permissions: ManyToMany<typeof Permission>

  //hooks
  @beforeCreate()
  public static assignUuid(role: Role) {
    role.id = uuidv4()
  }
}

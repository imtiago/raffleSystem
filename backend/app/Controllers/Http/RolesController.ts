import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Role from "App/Models/Role";
import StoreRoleValidator from "App/Validators/role/StoreRoleValidator";
import FindRoleByIdValidator from "App/Validators/role/FindRoleByIdValidator";
import UpdateRoleValidator from "App/Validators/role/UpdateRoleValidator";
import AssignRoleValidator from "App/Validators/role/AssignRoleValidator";
import AssignPermissionsRoleValidator from "App/Validators/role/AssignPermissionsRoleValidator";
import User from "App/Models/User";

export default class RolesController {
  public async store({ request, response }: HttpContextContract) {
    Logger.info("Store Role");
    const roleData = await request.validate(StoreRoleValidator);
    const role = await Role.create(roleData)
    if (!(role))
    return response.created(201);
  }
  public async assign({ request, response }: HttpContextContract) {
    Logger.info("Assign Roles");
    const {user_id, roles} = await request.validate(AssignRoleValidator);
    const user = await User.find(user_id);
    await user?.related('roles').sync(roles)
    return response.created();
  }
  public async findById({ request, response }: HttpContextContract) {
    Logger.info("Find Role By Id");
    const { id } = await request.validate(FindRoleByIdValidator);
    const role = await Role.findBy('id', id)
    return response.ok(role)
  }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Roles");
    const roles = await Role.all();
    return response.ok(roles);
  }
  public async update({ request, response }: HttpContextContract) {
    Logger.info("Update Role");
    const {id, ...roleData} = await request.validate(UpdateRoleValidator);
    const role = await Role.query()
    .where('id', id).update(roleData);
    return response.ok(role);
    
  }

  public async assignPermissions({ request, response }: HttpContextContract) {
    Logger.info("Assign permissions");
    const {permissions, role_id} = await request.validate(AssignPermissionsRoleValidator);
    const role = await Role.find(role_id);
    await role?.related('permissions').sync(permissions)
    return response.created();
  }

  // public async delete({ request, response }: HttpContextContract) {
  //   Logger.info("A info message");
  //   const { id } = await request.validate(FindRoleByIdValidator);
  //   const role = await Role.request.all());
  //   return response.status(200);
  // }
}

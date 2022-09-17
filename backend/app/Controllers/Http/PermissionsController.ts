import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Permission from "App/Models/Permission";
import StorePermissionValidator from "App/Validators/permission/StorePermissionValidator";
import FindPermissionByIdValidator from "App/Validators/permission/FindPermissionByIdValidator";
import UpdatePermissionValidator from "App/Validators/permission/UpdatePermissionValidator";

export default class PermissionsController {
  public async store({ request, response }: HttpContextContract) {
    Logger.info("Store Permission");
    const permissionData = await request.validate(StorePermissionValidator);
    const permission = await Permission.create(permissionData)
    if (!(permission))
    return response.created(201);
  }
  public async findById({ request, response }: HttpContextContract) {
    Logger.info("Find Permission By Id");
    const { id } = await request.validate(FindPermissionByIdValidator);
    const permission = await Permission.findBy('id', id)
    return response.ok(permission)
  }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Permissions");
    const permissions = await Permission.all();
    return response.ok(permissions);
  }
  public async update({ request, response }: HttpContextContract) {
    Logger.info("Update Permission");
    const {id, ...permissionData} = await request.validate(UpdatePermissionValidator);
    const permission = await Permission.query()
    .where('id', id).update(permissionData);
    return response.ok(permission);
    
  }
  // public async delete({ request, response }: HttpContextContract) {
  //   Logger.info("A info message");
  //   const { id } = await request.validate(FindPermissionByIdValidator);
  //   const permission = await Permission.request.all());
  //   return response.status(200);
  // }
}

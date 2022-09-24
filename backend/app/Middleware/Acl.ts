import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Permission from "App/Models/Permission";

export default class Acl {
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    permission: string
  ) {
    console.log("middleware acl");
    // let can = false;

    // // console.log(permission)
    // const permissionInstance = await Permission.findByOrFail(
    //   "name",
    //   permission[0]
    // );

    // const userLogged = auth.user;
    // await userLogged?.load((loader) => {
    //   loader.load("permissions").load("roles");
    // });
    // const userLoggedPermissions = userLogged?.permissions.map(
    //   (permission) => permission.id
    // );

    // can = userLoggedPermissions?.includes(permissionInstance.id) || false;

    // await permissionInstance?.load("roles");
    // const permissionsRoles = permissionInstance?.roles.map((role) => role.id);

    // // console.log( can)
    // // console.log( permissionInstance.name)
    // // console.log( userLogged?.permissions)
    // // console.log( userLogged?.permissions.includes(permissionInstance))

    // // // console.log(roles)
    // // // // code for middleware goes here. ABOVE THE NEXT CALL
    // const rolesUserLogged = userLogged?.roles.map((role) => role.id);

    // for (let role of rolesUserLogged) {
    //   if (permissionsRoles?.includes(role)) {
    //     can = true;
    //     break;
    //   }
    // }
    // // console.log(userLogged?.roles.map(role => role.name));
    // // // await userLogged?.load('permissions')

    // // // // console.log(userLogged)
    // // // // console.log(userLogged?.permissions)
    // // // let can = userLogged?.permissions.map(p=>p.name).includes(permission);
    // // // console.log(can)
    // // can && await next()
    await next()
  }
}

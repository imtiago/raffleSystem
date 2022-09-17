
export interface Role {
  id?: string,
  name: string,
  label?: string
}

export const systemRoles = {
  ROLE_ADMIN: {name:"ROLE_ADMIN"},
  ROLE_USER: {name:"ROLE_USER"}
}

export function checkRole(roles: Role[], userRoles: Role[]): boolean {
    const rolesString = roles.map((ur:Role)=>ur.name).join(',')
    return userRoles.some((r:Role) => rolesString?.split(",").includes(r.name));
}

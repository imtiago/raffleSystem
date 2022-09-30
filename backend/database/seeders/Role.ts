import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const uniqueKey = 'name'

    await Role.updateOrCreateMany(uniqueKey, [
      {
        name:"ROLE_DEV",
        label:"administrador Master",
        description:"pode realizar todas as tarefas e operações dentro do sistema sem nenhuma restrição"
      },
      {
        name:"ROLE_ADMIN",
        label:"administrador",
        description:"pode realizar todas as tarefas e operações dentro do sistema sem nenhuma restrição, menos atruir roles e funcionalidades"
      },
      {
        name:"ROLE_ASSOCIATE",
        label:"associado",
        description:"pode usar o sistema de maneira participativa"
      }
    ])
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class PermissionSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const uniqueKey = 'name'

    await Permission.updateOrCreateMany(uniqueKey, [
      {
        name:"CREATED_PRODUCT",
        label:"adicionar um produtor",
        description:"pode criar usuários"
      },
      {
        name:"CREATED_ORDER",
        label:"criar uma ordem",
        description:"pode realizar todas as tarefas e operações dentro do sistema sem nenhuma restrição, menos atruir roles e funcionalidades"
      }
    ])
  }
}

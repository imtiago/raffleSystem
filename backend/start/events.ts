/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from '@ioc:Adonis/Core/Event'
import Mail from '@ioc:Adonis/Addons/Mail'

Event.on('new:user', 'User.onNewUser')

Event.on('whatsapp:sent', ({ message, views, mailer, response }) => {
    console.log(message)
    console.log(views)
    console.log(mailer)
    console.log(response)
  })


Event.on('mail:sent', Mail.prettyPrint)


// console.log("estou carregando os arquivos...")


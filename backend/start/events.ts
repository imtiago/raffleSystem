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

Event.on('new:user', 'User.onNewUser')
Event.on('verified:user', 'User.verifiedUser')

Event.on('sendWhatsapp', 'WhatsApp.sendMessageWhatsapp')


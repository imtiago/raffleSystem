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

//events User
Event.on('new:user', 'User.onNewUser')
Event.on('verified:user', 'User.verifiedUser')
//events Order
Event.on('new:payment', 'Order.onPaymentReceived')
//events Ticket
Event.on('new:tickets', 'Ticket.onGeneratorTickets')

Event.on('sendWhatsapp', 'WhatsApp.sendMessageWhatsapp')


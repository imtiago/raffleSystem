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
Event.on('new:order', 'Order.onNewOrder')

//events Ticket
Event.on('new:tickets', 'Raffle.onGenerateTickets')

//whatsapp
Event.on('sendLink', 'WhatsApp.onSendLink')
Event.on('sendText', 'WhatsApp.onSendText')


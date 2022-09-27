import { afterCreate, BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import makeCode from '../utils/RandomCode'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public raffleOrderId: number

  //hooks
  @afterCreate()
  public static async assignCode(ticket: Ticket) {
    // const tickets = await Ticket.query().where('raffleOrderId',ticket.raffleOrderId).select('code');
    // console.log(tickets)
    // do{
    //   const code = makeCode(6);
    
    //   // tickets.map()
    //   for()
    //   if (!exist) {
    //     ticket.code = code;
    //     await ticket.save();
    //   }
    // }
    // order.code = 
  }
}

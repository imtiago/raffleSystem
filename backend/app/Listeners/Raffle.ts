import RaffleModel from "App/Models/Raffle";
import makeCode from "App/utils/RandomCode";

interface ITeste {
    pivot_order_id: string,
    pivot_raffle_id: string,
    pivot_quantity: number
}
interface IGeneratorTicket {
  selectedRaffles:ITeste[]
}
export default class Raffle {
  public async onGenerateTickets(data: IGeneratorTicket) {
    const { selectedRaffles } = data;
    const raffles = await RaffleModel.query().whereIn(
      "id",
      selectedRaffles.map((m) => m.pivot_raffle_id)
    ).preload('tickets')
    for await (const raffle of raffles) {
      const { tickets } = raffle;
      const selected = selectedRaffles.find(selectedRaffle=>selectedRaffle.pivot_raffle_id === raffle.id) as ITeste;
      let cont = 0;
      do{
        const bilheteCode = makeCode(6);
        const exist = tickets.some(ticket=>ticket.$extras.pivot_code === bilheteCode);
        if(exist)
          continue;

        await raffle.related('tickets').attach({
          [selected.pivot_order_id]:{
            code: bilheteCode
          }
        })
        cont++;
      }while(cont < selected.pivot_quantity)
    }
  }
}

import IndicationCode from "App/Models/IndicationCode";
import User from "App/Models/User";
import Event from "@ioc:Adonis/Core/Event";
// import VerifyEmail from "App/Mailers/VerifyEmail";
import Wallet from "App/Models/Wallet";
import whats from "Config/whatsapp";

export default class Order {
  public async onPaymentReceived(order) {
    // send email to user
    const percents = [7,4,3];
    const userOrder = await User.findOrFail(order.userId)

    const value = order.value;
    let userId = order.userId;
    

    await order.load('raffles')
    const r = order.raffles.map(item => item.$extras)

    Event.emit("new:tickets", {rt: r});


    // let cont = 0;
    // do{
    //   const indi = await IndicationCode.findByOrFail('userId', userId);
    //   if(!indi.indicationCodeReceived)
    //   break;
      
    //   const u = await IndicationCode.findByOrFail('indicationCode', indi.indicationCodeReceived);
    //   const user = await User.findOrFail(u.userId)
    //   const walletUser = await Wallet.findByOrFail('userId',user.id)
    //   walletUser.balance+=(value*percents[cont])/100;
    //   await walletUser.save();

    //   userId = walletUser.userId;
    //   cont++;
    // }while(cont < 3)


    // // const url = `https://208b-2804-1530-104-a0c2-6d93-685a-c433-c5e8.sa.ngrok.io/verifyAccount/${data.user?.id}/token/${data.token.tokenHash}`;
    // new VerifyEmail(data.user, url).preview();

    // // send mensage to user whatsapp
    // const paymentReceivedMensagem = `Olá ${userOrder.fullName}\n Recebemos seu pagamento no valor de ${value}.`
    // await whats.sendText(user.phone,paymentReceivedMensagem)
    // console.log("mensage enviada com sucesso")
  }
}
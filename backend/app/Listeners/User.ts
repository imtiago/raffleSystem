import Database from "@ioc:Adonis/Lucid/Database";
// import VerifyEmail from "App/Mailers/VerifyEmail";
import UserModel from "App/Models/User";
import { EnumStatusUser } from "App/utils/Enums";
import Event from "@ioc:Adonis/Core/Event";
import Env from '@ioc:Adonis/Core/Env'
const APP_URL = Env.get('APP_URL');
export default class User {
  public async onNewUser(data) {
    // send email to user
    const user = data.user;
    const url = `${APP_URL}/verifyAccount/${data.user?.id}/token/${data.token.tokenHash}`;
    // new VerifyEmail(data.user, url).preview();

    const welcomeMensagem = `Olá ${user.fullName} \n Eu sou assistente virtual da empresa. Gostariamos de lhe dar as boas vindas e dizer que estamos muito felizes por voce está aqui conosco.`
    await Event.emit("sendText", { phone: user.phone, message: welcomeMensagem });
    
    // const confirmationMensagem = `Confirme sua conta através do link!`
    // await Event.emit("sendLink", { phone: user.phone, message: confirmationMensagem, link: url });
  }
  public async onResetPassword(user) {
    console.log(user);
    // send email to the new user
  }
  public async verifiedUser(userId: string) {
    //gerar  um usuario ativo e com tudo funcionando
    const user = await UserModel.findOrFail(userId);
    user.status = EnumStatusUser.active.status;
    await user.save();

    await Database.from("api_tokens") // 👈 gives an instance of select query builder
      .where("user_id", userId)
      .delete();
      
      //send email welcome!!
      
      const verificationMensagem = `Sua Verificação de conta foi Relizada com sucesso, Bem vindo a nossa plataforma e Boa Sorte!!`
      await Event.emit("sendText", { phone: user.phone, message: verificationMensagem });
  }
}

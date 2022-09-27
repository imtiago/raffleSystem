import Database from "@ioc:Adonis/Lucid/Database";
// import VerifyEmail from "App/Mailers/VerifyEmail";
import UserModel from "App/Models/User";
import { EnumStatusUser } from "App/utils/Enums";
import whats from "Config/whatsapp";
import Env from '@ioc:Adonis/Core/Env'
const urlApp = Env.get('WEB_URL');
export default class User {
  public async onNewUser(data) {
    // send email to user
    const user = data.user;
    const url = `${urlApp}/users/${data.user?.id}/token/${data.token.tokenHash}`;
    // console.log(url)
    // new VerifyEmail(data.user, url).preview();

    // send mensage to user whatsapp
    const welcomeMensagem = `Olá ${user.fullName} \n Eu sou assistente virtual da empresa. Gostariamos de lhe dar as boas vindas e dizer que estamos muito felizes por voce está aqui conosco.`
    await whats.sendText(user.phone,welcomeMensagem)

    console.log(user.phone)
    await whats.sendLink(data.user.phone,url,"Confirme sua conta através do link!")
    console.log("mensage enviada com sucesso")
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

    // send mensage to user whatsapp
    const msn = `Sua Verificação de conta foi Relizada com sucesso, Bem vindo a nossa plataforma e Boa Sorte!!`
    await whats.sendText(user.phone,msn)
  }
}

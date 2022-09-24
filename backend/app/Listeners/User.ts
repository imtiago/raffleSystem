import Database from "@ioc:Adonis/Lucid/Database";
import VerifyEmail from "App/Mailers/VerifyEmail";
import UserModel from "App/Models/User";
import { EnumStatusUser } from "App/utils/Enums";
import whats from "Config/whatsapp";

export default class User {
  // public async onNewUser(user: EventsList['new:user']) {
  public async onNewUser(data) {
    // console.log(data);
    // send email to user
    const user = data.user;
    const url = `https://208b-2804-1530-104-a0c2-6d93-685a-c433-c5e8.sa.ngrok.io/verifyAccount/${data.user?.id}/token/${data.token.tokenHash}`;
    // new VerifyEmail(data.user, url).preview();

    // send mensage to user whatsapp
    const welcomeMensagem = `Olá ${user.fullName} \n Eu sou a Yara babygirl, assistente virtual da empresa. Gostariamos de lhe dar as boas vindas e dizer que estamos muito felizes por voce está aqui conosco.`
    await whats.sendText(user.phone,welcomeMensagem)

    const msn = `Acesse o link para confirmação de sua conta ${url}`
    await whats.sendLink(data.user.phone,url,"Confirmação de Conta")

    // console.log("mensage enviada com sucesso")
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

    //send mensage welcome whatsapp

    // send mensage to user whatsapp
    const msn = `Sua Verificação de conta foi Relizada com sucesso, Bem vindo a nossa plataforma e Boa Sorte!!`
    await whats.sendText(user.phone,msn)
  }
}

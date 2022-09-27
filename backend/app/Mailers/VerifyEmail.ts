import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import ejs from 'ejs'
import { join } from 'path';
import { env } from 'process';


export default class VerifyEmail extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()
  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  private systemEmailInformation = env.SMTP_USERNAME as string
  private pathTemplate = join(__dirname,'..','..','resources','views','emails','confirm_account.ejs')

  constructor (private toUser: User, private urlConfirmation : string) {
    super()
  }
  public async prepare(message: MessageContract) {
    const html = await ejs.renderFile(this.pathTemplate,{user:this.toUser,url:this.urlConfirmation},{async: true});
    message.subject('Validação de Conta').from(this.systemEmailInformation).to(this.toUser.email).html(html)
  }
}

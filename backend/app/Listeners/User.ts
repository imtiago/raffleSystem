import VerifyEmail from 'App/Mailers/VerifyEmail';
// import whats from 'Config/whatsapp'

export default class User {
  // public async onNewUser(user: EventsList['new:user']) {
  public async onNewUser(data) {
    console.log(data)
    // send email to user
    const url = `https://localhost:3333/api/users/${data.user?.id}/tokens/${data.token.token}`;
    new VerifyEmail(data.user, url).preview();
    
    
    // send mensage to user whatsapp
    // const msn = `Acesse o link para confirmação de sua conta ${url}`
    // await whats.sendText(data.user.phone,msn)
    // await whats.sendText(data.user.phone,data.url)
    // send email to the new user
  }
  public async onResetPassword(user) {
    console.log(user)
    // send email to the new user
  }
}


export default class User {
  // public async onNewUser(user: EventsList['new:user']) {
  public async onNewUser(user) {
    console.log(user)
    // send email to the new user
  }
  public async onResetPassword(user) {
    console.log(user)
    // send email to the new user
  }
}

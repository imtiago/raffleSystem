import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import User from "App/Models/User";
import CreateUser from "App/Models/CreateUser";
import StoreUserValidator from "App/Validators/StoreUserValidator";
import FindUserByIdValidator from "App/Validators/FindUserByIdValidator";
import Event from '@ioc:Adonis/Core/Event'
import { join } from "path";
import Mail from "@ioc:Adonis/Addons/Mail";
import VerifyEmail from "App/Mailers/VerifyEmail";
import WhatsApp from "App/Listeners/WhatsApp";

export default class UsersController {
  public async signIn({auth, request, response }: HttpContextContract) {
    Logger.info("Sign-in");
    
    try {
      const hash = request.headers().authorization?.split(" ")[1];
      if(hash){
        const [email, password] = Buffer.from(hash, "base64").toString().split(":");
        const user = await auth.use('api').verifyCredentials(email, password)
        if(user.status === 'PENDENTE')
        return response.unauthorized('confirm your account')

        const token = await auth.use('api').generate(user)
        return token
      }
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
  public async logout({ auth }: HttpContextContract) {
      Logger.info("logout User");
      await auth.use('api').revoke()
      return {
        revoked: true
      }
  }
  public async store({ request, response }: HttpContextContract) {
    Logger.info("Store User");
    
        const {indicationCode, ...userData} = await request.validate(StoreUserValidator);
        const userModel = await CreateUser.create(userData);
        // if (!userModel)
        new VerifyEmail(userModel,'http://www.google.com').preview()

        // const res = new WhatsApp()
        // console.log(res)
    // Event.emit('mail:sent',{})
    // Event.emit('new:user', { id: 1 })

    return response.created(userModel);
  }
  public async findById({ request, response }: HttpContextContract) {
    Logger.info("Find User By Id");
    const { id } = await request.validate(FindUserByIdValidator);
    const user = await User.findBy('id', id)
    return response.ok(user)
  }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Users");
    const users = await User.all()
    return response.ok(users);
  }
  // public async update({ request, response }: HttpContextContract) {
  //   Logger.info("A info message");
  //   console.log(request.all());
  //   return response.status(200);
  // }
  // public async delete({ request, response }: HttpContextContract) {
  //   Logger.info("A info message");
  //   console.log(request.all());
  //   return response.status(200);
  // }
  // public async find({ request, response }: HttpContextContract) {
  //   Logger.info("A info message");
  //   console.log(request.all());
  //   return response.status(200);
  // }
}

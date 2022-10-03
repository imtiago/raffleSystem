import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import User from "App/Models/User";
import StoreUserValidator from "App/Validators/StoreUserValidator";
// import VerifyUserValidator from "App/Validators/VerifyUserValidator";
import FindUserByIdValidator from "App/Validators/FindUserByIdValidator";
import Event from "@ioc:Adonis/Core/Event";
import Database from "@ioc:Adonis/Lucid/Database";
import DeleteUserValidator from "App/Validators/user/DeleteUserValidator";
import IndicationCode from "App/Models/IndicationCode";
import { EnumStatusUser } from "App/utils/Enums";

//associate

export default class UsersController {
  public async signIn({ auth, request, response }: HttpContextContract) {
    Logger.info("Sign-in");

    try {
      const hash = request.headers().authorization?.split(" ")[1];
      if (hash) {
        const [email, password] = Buffer.from(hash, "base64")
          .toString()
          .split(":");
        const user = await auth.use("api").verifyCredentials(email, password);
        if (user.status === EnumStatusUser.inactive.status)
          return response.unauthorized("confirm your account");

        const token = await auth.use("api").generate(user);
        return token;
      }
    } catch {
      return response.unauthorized("Invalid credentials");
    }
  }
  public async logout({ auth }: HttpContextContract) {
    Logger.info("logout User");
    await auth.use("api").revoke();
    return {
      revoked: true,
    };
  }
  public async verify({ request, response }: HttpContextContract) {
    Logger.info("verify User");
    // const { userId, tokenId } = await request.validate(VerifyUserValidator);
    const { userId, tokenId } = request.params();
    // console.log(userId, tokenId);

    try {
      const confirmCredentials = await Database.from("api_tokens") // 👈 gives an instance of select query builder
        .select("*")
        .where("user_id", userId)
        .where("token", tokenId)
        .first();

      // console.log(confirmCredentials)

      if (!confirmCredentials)
        return response.ok("<div><h1>Usuário já verificado!</h1><div>");

      await Event.emit("verified:user", userId);
    } catch (err) {
      // Logger.error(err);
      return response.conflict("<div><h1>Usuário já verificado!</h1><div>");
    }
    // return response.ok("conta verificada com sucesso!");
    return response.ok("<div><h1>conta verificada com sucesso!</h1><div>");
  }
  public async store({ auth, request, response }: HttpContextContract) {
    Logger.info("Store User");
    const { indicationCode: indicationCodeReceived, ...userData } =
      await request.validate(StoreUserValidator);
    const user = await User.create(userData);

    if (indicationCodeReceived) {
      await IndicationCode.query()
        .where("userId", user.id)
        .update({ indicationCodeReceived });
    }

    const token = await auth.use("api").generate(user as User);

    Event.emit("new:user", { user, token });

    return response.created(user);
  }
  public async findById({ request, response }: HttpContextContract) {
    Logger.info("Find User By Id");
    const { id } = await request.validate(FindUserByIdValidator);
    const user = await User.findBy("id", id);
    return response.ok(user);
  }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Users");
    const users = await User.all();
    return response.ok(users);
  }
  // public async update({ request, response }: HttpContextContract) {
  //   Logger.info("Update User");
  //   console.log(request.all());
  //   return response.status(200);
  // }
  public async delete({ auth, request, response }: HttpContextContract) {
    Logger.info("Delete User");
    const { userId, password } = await request.validate(DeleteUserValidator);

    if (auth.use("api").isLoggedIn) {
      try {
        await auth
          .use("api")
          .verifyCredentials(auth.use("api").user!.email, password);
      } catch (error) {
        // console.log(error)
        return response.forbidden();
      }
    }

    const userDeleted = await User.findOrFail(userId);
    await userDeleted.delete();

    return response.ok("user deleted success");
  }
}

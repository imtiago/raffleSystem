import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Raffle from "App/Models/Raffle";
import { EnumStatusProduct } from "App/utils/Enums";
import StoreRaffleValidator from "App/Validators/raffle/StoreRaffleValidator";

export default class RafflesController {
  public async store({ request, response }: HttpContextContract) {
    Logger.info("Store Raffle");
    const { products, ...raffleData } = await request.validate(
      StoreRaffleValidator
    );

    const raffle = await Raffle.create(raffleData);

    let result = {};
    products.forEach((product) => {
      result[product.productId] = {
        quantity: product.quantity,
      };
    });

    await raffle.related("products").sync(result);

    return response.created(raffle);
  }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Raffles");
    const raffles = await Raffle.query()
      .where("status", EnumStatusProduct.pending.status)
      .preload("products", (postsQuery) => {
        postsQuery.preload("images");
      });
    return response.ok(raffles);
  }
  public async indexAdmin({ response }: HttpContextContract) {
    Logger.info("index of Raffles");
    const raffles = await Raffle.query().preload("products", (postsQuery) => {
      postsQuery.preload("images");
    });
    return response.ok(raffles);
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

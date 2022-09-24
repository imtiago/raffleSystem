import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Order from "App/Models/Order";
import Product from "App/Models/Product";
import Raffle from "App/Models/Raffle";
import User from "App/Models/User";

export default class DashboardController {

  public async info({ response }: HttpContextContract) {
    Logger.info("Informations to dashboard about system");
    const users = await User.all();
    const products = await Product.all();
    const raffles = await Raffle.all();
    const orders = await Order.all();
    const dashboardInformations = {
      qntUsers: users.length,
      qntRaffles: raffles.length,
      qntProducts: products.length,
      qntOrders: orders.length
    }
    return response.ok(dashboardInformations);
  }

}

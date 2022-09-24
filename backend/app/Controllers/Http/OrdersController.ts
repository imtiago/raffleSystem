import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Order from "App/Models/Order";
import CreateOrder from "App/Models/CreateOrder";
import GeneratorOrderValidator from "App/Validators/order/GeneratorOrderValidator";
import VerifyOrderValidator from "App/Validators/VerifyOrderValidator";
import FindOrderByIdValidator from "App/Validators/FindOrderByIdValidator";
import Event from "@ioc:Adonis/Core/Event";
import Raffle from "App/Models/Raffle";
import Orders from "Database/migrations/1663872656258_orders";
import Database from "@ioc:Adonis/Lucid/Database";

//associate

export default class OrdersController {
  public async generate({ auth, request, response }: HttpContextContract) {
    Logger.info("Generator Order");
    const { selectedRaffles } = await request.validate(GeneratorOrderValidator);
    const user = auth.user;

    let value = 0;
    const raffles = await Raffle.query().whereIn(
      "id",
      selectedRaffles.map((m) => m.id)
    );
    raffles.forEach((raffle) => {
      for (let i = 0; i < selectedRaffles.length; i++) {
        if (selectedRaffles[i].id === raffle.id) {
          value += raffle.price * selectedRaffles[i].quantity;
          break;
        }
      }
    });
    const data = {
      userId: user?.id,
      value,
      status: "AWAITING_PAYMENT",
    };
    const order = await Order.create(data);

    let result = {};
    selectedRaffles.forEach((selected) => {
      result[selected.id] = {
        quantity: selected.quantity,
      };
    });
    console.log(result);

    await order.related("raffles").sync(result);

    return response.created(order);
  }
  // public async findById({ request, response }: HttpContextContract) {
  //   Logger.info("Find Order By Id");
  //   const { id } = await request.validate(FindOrderByIdValidator);
  //   const Order = await Order.findBy("id", id);
  //   return response.ok(Order);
  // }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Orders");
    const Orders = await Order.all();
    return response.ok(Orders);
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

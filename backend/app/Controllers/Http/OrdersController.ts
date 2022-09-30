import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Order from "App/Models/Order";
import GeneratorOrderValidator from "App/Validators/order/GeneratorOrderValidator";
import Raffle from "App/Models/Raffle";
import { EnumStatusOrder } from "App/utils/Enums";
import Event from "@ioc:Adonis/Core/Event";

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
    };
    const order = await Order.create(data);

    let result = {};
    selectedRaffles.forEach((selected) => {
      result[selected.id] = {
        quantity: selected.quantity,
      };
    });

    await order.related("raffles").sync(result);

    Event.emit("new:order", order);

    return response.created(order);
  }

  // public async findById({ request, response }: HttpContextContract) {
  //   Logger.info("Find Order By Id");
  //   const { id } = request.params();
  //   // const { id } = await request.validate(FindOrderByIdValidator);
  //   // const order = await Order.findBy("id", id)?.load('');
  //   // return response.ok(order);
  // }
  public async findByCode({ request, response }: HttpContextContract) {
    Logger.info("Find Order By Code");
    const { code } = request.params();
    // const { id } = await request.validate(FindOrderByIdValidator);
    const order = await Order.query()
      .where("code", code)
      .preload("tickets")
      .preload("raffles")
      .first();
    // console.log(order);
    return response.ok(order);
  }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Orders");
    const Orders = await Order.query()
      // .where("status", EnumStatusRaffle.pending.status)
      .preload("user");
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
  public async paymentReceived({ request, response }: HttpContextContract) {
    Logger.info("paymentReceived");
    const { id } = request.params();

    const order = await Order.findOrFail(id);
    if (order.status === EnumStatusOrder.PAYMENT_RECEIVED.status)
      return response.status(409);

    order.status = EnumStatusOrder.PAYMENT_RECEIVED.status;
    await order.save();

    Event.emit("new:payment", order);

    return response.status(200);
  }
}

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Raffle from "App/Models/Raffle";

export default class RafflesController {
  // public async store({ request, response }: HttpContextContract) {
  //   Logger.info("Store Raffle");
  //   const concursoData = await request.validate(StoreConcursoValidator);
  //   if (!(await Raffle.create(concursoData)))

  //     return response.created();
  // }
  public async index({ response }: HttpContextContract) {
    Logger.info("index of Raffles");
    const raffles = await Raffle.all();
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

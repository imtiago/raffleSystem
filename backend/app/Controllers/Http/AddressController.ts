import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Address from "App/Models/Address";
import StoreAddressValidator from "App/Validators/StoreAddressValidator";

export default class AddressController {
  public async store({ request, response }: HttpContextContract) {
    console.log("ok")
    Logger.info("Store Address");
    const addressData = await request.validate(StoreAddressValidator);
    if(!await Address.create(addressData))

    return response.created();
  }
  public async index({ response }: HttpContextContract) {
    Logger.info("A info message");
    const ListAddress = await Address.all();
    return response.ok(ListAddress);
  }
  public async update({ request, response }: HttpContextContract) {
    Logger.info("A info message");
    console.log(request.all());
    return response.status(200);
  }
  public async delete({ request, response }: HttpContextContract) {
    Logger.info("A info message");
    console.log(request.all());
    return response.status(200);
  }
  public async find({ request, response }: HttpContextContract) {
    Logger.info("A info message");
    console.log(request.all());
    return response.status(200);
  }
}

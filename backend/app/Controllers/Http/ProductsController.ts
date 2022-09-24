import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Product from "App/Models/Product";
import StoreProductValidator from "App/Validators/product/StoreProductValidator";

export default class ProductsController {
  public async store({ request, response }: HttpContextContract) {
    Logger.info("Store Product");
    const productData = await request.validate(StoreProductValidator);
    const product = await Product.create(productData);
    if (!product) return response.created(product);
  }

  public async index({ response }: HttpContextContract) {
    Logger.info("index of Products");
    const products = await Product.query().preload("images");
    return response.ok(products);
  }

  // public async findById({ request, response }: HttpContextContract) {
  //   const { id } = await request.validate(StoreProductValidator);
  //   Logger.info("Find Product of Id");
  //   const products = await Product.findBy("name","carro");
  //   return response.ok(products);
  // }

  // public async findByName({ request, response }: HttpContextContract) {
  //   const {name} = await request.validate(StoreProductValidator);
  //   Logger.info("List Products of Name");
  //   const products = await Product.findBy("name","carro");
  //   return response.ok(products);
  // }
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

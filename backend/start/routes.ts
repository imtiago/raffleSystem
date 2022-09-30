/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

// import Event from '@ioc:Adonis/Core/Event'
import Route from "@ioc:Adonis/Core/Route";
// import WhatsApp from 'App/Listeners/WhatsApp'

Route.get("/teste", async () => {
  // const res = await new WhatsApp("teste")
  // await res.sendText("68984241179","vá para o google https://www.google.com")
  // console.log(res)
  //  Event.emit('whatsapp:send')
  // new WhatsApp();
});

Route.get("/verifyAccount/:userId/token/:tokenId", "UsersController.verify");
Route.post("/signIn", "UsersController.signIn");
Route.post("/rafflesIds", "RafflesController.findIds");
Route.get("/raffles", "RafflesController.index");
Route.post("/users", "UsersController.store");
Route.get("/orders/:code", "OrdersController.findByCode");

Route.get("/orders/:id/paymentReceived", "OrdersController.paymentReceived");

//Attention!! here you have push all routes with need authentication
Route.group(() => {
  Route.get("/dashboard", "DashboardController.info");
  Route.get("/logout", "UsersController.logout");

  Route.group(() => {
    Route.put("/updatePassword", "ProfilesController.updatePassword");
    Route.get("/", "ProfilesController.getMyAccount");
    Route.put("/", "ProfilesController.update");
  }).prefix("/profiles");

  Route.group(() => {
    Route.get("/:id", "UsersController.findById");
    Route.get("/", "UsersController.index");
    Route.delete("/:id", "UsersController.delete");
  }).prefix("/users");

  Route.group(() => {
    Route.post("/", "ProductsController.store").middleware([
      "acl:CREATE_PRODUCT",
      "image",
    ]);
    Route.get("/", "ProductsController.index");
    // Route.get('/:name', 'ProductsController.index')
  }).prefix("/products");

  Route.group(() => {
    Route.post("/", "RafflesController.store");
    // Route.get('/:name', 'RafflesController.index')
  }).prefix("/raffles");

  Route.group(() => {
    Route.post("/", "OrdersController.generate");
    Route.get("/", "OrdersController.index");
    // Route.get("/:id", "OrdersController.findById");
  }).prefix("/orders");

  Route.group(() => {
    Route.post("/assign", "RolesController.assign");
    Route.post("/assignPermissions", "RolesController.assignPermissions");
    Route.post("/add", "RolesController.store");
    Route.get("/", "RolesController.index");
    // Route.get('/:name', 'ProductsController.index')
  }).prefix("/roles");

  Route.group(() => {
    Route.post("/add", "PermissionsController.store");
    // Route.get('/', 'ProductsController.index')
    // Route.get('/:name', 'ProductsController.index')
  }).prefix("/permissions");

  Route.group(() => {
    Route.post("/add", "AddressController.store");
    Route.get("/", "AddressController.index");
  }).prefix("/address");
}).middleware("auth");

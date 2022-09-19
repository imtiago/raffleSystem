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
import Route from '@ioc:Adonis/Core/Route'
// import WhatsApp from 'App/Listeners/WhatsApp'

Route.get('/teste', async ()=>{

  // const res = await new WhatsApp("teste")
  // await res.sendText("68984241179","vá para o google https://www.google.com")
  // console.log(res)
    //  Event.emit('whatsapp:send')
    // new WhatsApp();
})

Route.get('/users/:userId/verify/:tokenId', 'UsersController.verify')
Route.post('/signIn', 'UsersController.signIn')
Route.get('/logout', 'UsersController.logout')

Route.group(() => {
  Route.post('/', 'UsersController.store')
})
.prefix('/users')

//Attention!! here you have push all routes with need authentication
Route.group(() => {
  
  Route.get('/dashboard', 'DashboardController.info')
    
  Route.group(() => {
    Route.put('/updatePassword', 'ProfilesController.updatePassword')
    Route.get('/', 'ProfilesController.getMyAccount')
    Route.put('/', 'ProfilesController.update')
  })
  .prefix('/profile')
  
  Route.group(() => {
    Route.post('/logout', 'UsersController.logout')
    Route.get('/:id', 'UsersController.findById')
    Route.get('/', 'UsersController.index')
  })
  .prefix('/users')
  
  Route.group(() => {
    Route.post('/add', 'ProductsController.store')
    Route.get('/', 'ProductsController.index')
    // Route.get('/:name', 'ProductsController.index')
  })
  .prefix('/products')

  Route.group(() => {
    // Route.post('/add', 'ProductsController.store')
    Route.get('/', 'RafflesController.index')
    // Route.get('/:name', 'ProductsController.index')
  })
  .prefix('/raffles')
  
  Route.group(() => {
    Route.post('/assign', 'RolesController.assign')
    Route.post('/add', 'RolesController.store')
    Route.get('/', 'RolesController.index')
    // Route.get('/:name', 'ProductsController.index')
  })
  .prefix('/roles')
  
  Route.group(() => {
    Route.post('/add', 'PermissionsController.store')
    // Route.get('/', 'ProductsController.index')
    // Route.get('/:name', 'ProductsController.index')
  })
  .prefix('/permissions')

  Route.group(() => {
      // Route.post('/add', 'ProductsController.store')
      Route.get('/', 'ConcursosController.index')
      // Route.get('/:name', 'ProductsController.index')
    })
    .prefix('/concursos')
  
  Route.group(() => {
      Route.post('/add', 'AddressController.store')
      Route.get('/', 'AddressController.index')
    })
    .prefix('/address')
}).middleware('auth')

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/teste', async () => {
  return { hello: 'world' }
}).middleware('image')

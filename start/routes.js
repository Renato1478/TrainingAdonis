'use strict'

const Route = use('Route')

Route.on('/welcome').render('base.welcome')

// USER
Route.get('/signup','AuthController.signup').as('auth.signup')
Route.post('/signup','AuthController.store').as('auth.store').validator('SignUp')
Route.get('/login','AuthController.login').as('auth.login')
Route.post('/login','AuthController.auth').as('auth.auth').validator('Login')
Route.get('/logout','AuthController.logout').as('auth.logout')

Route.group(() => {
    Route.get('/','DashboardController.index').as('home')
    //Pet
    Route.resource('pets','PetController').validator(new Map([
        [['pets.store'], ['StorePet']]
    ]))
    Route.post('/upload_pet_image/:id','PetController.uploadImage').as('pets.upload_image')
    //Request
    Route.resource('pedidos','PetRequestController')
}).middleware(['auth'])
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
    //PET
    Route.get('pets/create','PetController.create').as('pets.create')
    Route.get('pets/:id','PetController.show').as('pets.show')
    Route.post('pets','PetController.store').as('pets.store').validator('CreatePet')
}).middleware(['auth'])

Route.get('*', ({view}) => {
    return view.render("error.404")
})
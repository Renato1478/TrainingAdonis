'use strict'

const PetRequest = use('App/Models/PetRequest')
const Database = use('Database')

class PetRequestController {

  async index ({ response, view, auth }) {
    const petRequests = await Database
        .table('pet_requests')
        .select(
          'pet_requests.id',
          'donors.id as donor_id',
          'pet_requests.pet_id',
        )
        .innerJoin('pets', 'pet_requests.pet_id', 'pets.id')
        .innerJoin('users as donors', 'pets.donor_id', 'donors.id')
        .where('pet_requests.adopter_id', '=', auth.user.id)

    return response.send(view.render('pet_requests.index', { pet_requests: petRequests }))
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response, auth, session }) {
    const userId = auth.user.id
    const petRequest = await PetRequest.create({
      adopter_id: userId,
      pet_id: request.all().pet_id
    })
    session.flash({info: 'Pedido enviado, aguarde a resposta do dono' })
    return response.redirect('/')
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = PetRequestController

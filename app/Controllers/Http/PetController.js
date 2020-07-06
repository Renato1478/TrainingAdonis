'use strict'

const Helpers = use('Helpers')
const fs = require("fs");

const Pet = use('App/Models/Pet')
const PetRequest = use('App/Models/PetRequest')

class PetController {
  async index() {
    const pets = await Pet.all()
    return pets
  }

  async create ({ response, view }) {
    return response.send(view.render('pets.create'))
  }

  async store ({ request, response, session, auth }) {
    try {
      const petData = request.except(['_csrf','profile_pic'])
      petData.donor_id = auth.user.id

      const pet = await Pet.create(petData) 
      
      // submit the main picture // 
      const profile_pic = request.file('profile_pic', {
        types: ['image'],
        size: '2mb'
      })

      if(profile_pic){
        pet.profile_pic = new Date().getTime() +'.'+ profile_pic.subtype

        await profile_pic.move(Helpers.publicPath('img/pets/'+pet.id), {
            name: pet.profile_pic,
            overwrite: true
        })
    
        if (!profile_pic.moved()) {   
            session.flash({ error: 'Ocorreu um erro ao subir a imagem' })
            return response.redirect('back')
        }
      }
      pet.save()

      session.flash({success: 'Pet registrado com sucesso!' })
      return response.redirect('/') 
    } catch (error) {
      session.flash({error: error.message })
      return response.redirect('/')
    }
  }

  async edit ({ params, response, view, session }) {
      const pet = await Pet.find(params.id)
      const images = fs.readdirSync(Helpers.publicPath('img/pets/'+pet.id));
      return response.send(view.render('pets.edit', { pet: pet.toJSON(), images })) 
  }

  async update ({ params, request, response, session }) {
    try {
      const pet = await Pet.find(params.id)
      pet.merge(request.except(['_csrf','_method']))

      await pet.save()

      session.flash({success: 'Pet salvo com sucesso!' })
      return response.redirect('/')
    } catch (error) {
      return response.redirect('back')
    }
  }

  async show ({ params, response, view, session, auth }) {
    const pet = await Pet.find(params.id)
    const pet_requests = await PetRequest
        .query()
        .where('adopter_id','=', auth.user.id)
        .andWhere('pet_id', '=', pet.id)
        .fetch()
    const images = fs.readdirSync(Helpers.publicPath('img/pets/'+pet.id));

    return response.send(view.render('pets.show', { 
      pet: pet.toJSON(),
      images,
      pet_requests: pet_requests.toJSON() 
    }))
  }

  async uploadImage ({ params, request, response  }) {
    let responseJson = {
      type: 'success'
    }

    const pet = await Pet.find(params.id)
    
    const pic = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    if(pic){
      let picName = new Date().getTime() +'.'+ pic.subtype

      await pic.move(Helpers.publicPath('img/pets/'+pet.id), {
          name: picName,
      })

      if (!pic.moved()) {
        responseJson = {
          type: 'error',
          message: 'Erro ao salvar imagem'
        }   
      }
    } else {
      responseJson = {
        type: 'error',
        message: 'Erro ao enviar imagem'
      }
    }

    return response.send(responseJson)
  }
}

module.exports = PetController

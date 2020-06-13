'use strict'

const Pet = use('App/Models/Pet')
const Helpers = use('Helpers')

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

      const petData = request.except(['_csrf','main_pic'])
      petData.donor_id = auth.user.id

      const pet = await Pet.create(petData) 
      
      // submit the main picture // 
      const mainPic = request.file('main_pic', {
        types: ['image'],
        size: '2mb'
      })

      if(mainPic){
        pet.main_pic = new Date().getTime() + mainPic.subtype

        await mainPic.move(Helpers.publicPath('img/pets/'+pet.id), {
            name: pet.main_pic,
            overwrite: true
        })
    
        if (!mainPic.moved()) {   
            session.flash({ error: 'Ocorreu um erro ao subir a imagem' })
            return response.redirect('back')
        }
      }
      pet.save()

      session.flash({success: 'Pet registrado com sucesso!' })
      return response.redirect('/') 
    } 
    catch (error) {
      return response.redirect('back')
    }
  }

  async edit ({ params, response, view, session }) {
    try {

      const pet = await Pet.find(params.id)

      return response.send(view.render('pets.edit', { pet: pet.toJSON() }))
    } 
    catch (error) {
      return response.redirect('back')
    }
  }

  async update ({ params, request, response, session }) {
    try {

      const pet = await Pet.find(params.id)
      pet.merge(request.except(['_csrf','_method']))

      await pet.save()

      session.flash({success: 'Pet salvo com sucesso!' })
      return response.redirect('/')
    } 
    catch (error) {
      return response.redirect('back')
    }
  }

  async show ({ params, response, view, session }) {
    try {

      const pet = await Pet.find(params.id)

      return response.send(view.render('pets.show', { pet: pet.toJSON() }))
    } 
    catch (error) {
      return response.redirect('back')
    }
  }
  
}

module.exports = PetController

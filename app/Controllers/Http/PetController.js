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
      // SUBMIT THE PET TO DB //
      const petData = request.only([
          'name',
          'breed',
          'description',
          'type',
          'size',
          'age',
          'gender',
          'breed',
          'adoption_fee',
          'state',
          'county',
      ])
      petData.donor_id = auth.user.id

      const pet = await Pet.create(petData) 
      
      // SUBMIT THE MAIN PICTURE // 
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
    } catch (error) {
      session.flash({error: error.message })
      return response.redirect('back')
    }
  }

  async show ({ params, response, view, session }) {
    try {
      const pet = await Pet.find(params.id)

      return response.send(view.render('pets.show', { pet: pet.toJSON() }))
    } catch (error) {
      session.flash({error: 'Ocorrou um erro! Caso persista, contate o suporte.'})
      return response.redirect('back')
    }
  }
}

module.exports = PetController

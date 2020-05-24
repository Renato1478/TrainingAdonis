'use strict'

class CreatePet {
  get rules () {
    return {
      'name': 'required',
      'breed': 'required',
      'description': 'required',
      'type': 'required',
      'size': 'required',
      'age': 'required',
      'gender': 'required',
      'state': 'required',
      'county': 'required',
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é requerido.',
    }
  }
  
  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()
    
    return this.ctx.response.redirect('back')
  }
  
}

module.exports = CreatePet

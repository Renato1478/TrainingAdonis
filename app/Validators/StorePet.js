'use strict'

class StorePet {
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
      'profile_pic': 'required',
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

module.exports = StorePet

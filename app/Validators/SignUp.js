'use strict'

class SignUp {
  get rules () {
    return {
      'email': 'required|email|unique:users',
      'name': 'required|unique:users',
      'surname': 'required',
      'password': 'required',
      'state': 'required',
      'county': 'required'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é requerido.',
      'unique': 'Este {{ field }} já existe.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()
    
    return this.ctx.response.redirect('back')
  }
  
}

module.exports = SignUp

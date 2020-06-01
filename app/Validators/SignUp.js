'use strict'

class SignUp {
  get rules () {
    return {
      'email': 'required|email|unique:users',
      'name': 'required',
      'surname': 'required',
      'password': 'required',
      'state': 'required',
      'county': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Você precisa fornecer um {{ field }}.',
      'unique': 'Esse {{ field }} já existe.',
      'email': 'Você precisa fornecer um email válido.',
      'password.required': 'Você precisa fornecer uma senha.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()
    
    return this.ctx.response.redirect('back')
  }
  
}

module.exports = SignUp

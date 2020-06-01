'use strict'

class Login {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Você precisa fornecer um email.',
      'email.unique': 'Esse email já existe.',
      'email': 'Você precisa fornecer um email válido.',
      'password.required': 'Você precisa fornecer uma senha.',
      'password.unique': 'Você precisa fornecer uma senha.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll()
    
    return this.ctx.response.redirect('back')
  }
  
}

module.exports = Login

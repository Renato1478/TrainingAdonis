'use strict'

const Pet = use('App/Models/Pet');

class DashboardController {

    async index({ response, view, session }) {
        const pets = await Pet.all()
        return response.send(view.render('dashboard.index', { pets: pets.toJSON() }))
    }

}

module.exports = DashboardController

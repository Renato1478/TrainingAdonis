'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')

class PetRequest extends Model {
    pet() {
        return this.belongsTo('App/Models/Pet', 'pet_id', 'id').fetch()
    }

    adopter() {
        return this.belongsTo('App/Models/User', 'adopter_id', 'id').fetch()
    }

    donor() {
        return this
                .belongsToMany('App/Models/User')
                .pivotModel('App/Models/Pet')
    }
}

module.exports = PetRequest

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PetSchema extends Schema {
  up () {
    this.create('pets', (table) => {
      table.increments()
      table.integer('donor_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('adopter_id').unsigned().references('id').inTable('users')
      table.enu('type', ['cao','gato','passaro','outro']).notNullable()
      table.string('name', 80).notNullable()
      table.string('description', 511).notNullable()
      table.enu('size', ['pequeno','medio','grande']).notNullable()
      table.enu('age', ['recem-nascido','jovem','adulto','idoso']).notNullable()
      table.enu('gender', ['feminino','masculino']).notNullable()
      table.float('adoption_fee')
      table.string('breed', 45).notNullable()
      table.string('state', 63).notNullable()
      table.string('county', 63).notNullable()
      table.enu('status', ['ativo','inativo','adotado']).notNullable().defaultTo('ativo')
      table.string('profile_pic', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('pets')
  }
}

module.exports = PetSchema

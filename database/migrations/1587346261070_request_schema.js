'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequestSchema extends Schema {
  up () {
    this.create('requests', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('pet_id').unsigned().references('id').inTable('pets').notNullable()
      table.enu('status', ['rejeitado','aceito','em_espera']).defaultTo('em_espera').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('requests')
  }
}

module.exports = RequestSchema

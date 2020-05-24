'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('name').notNullable()
      table.string('surname').notNullable()
      table.string('password', 60).notNullable()
      table.string('profile_pic', 255)
      table.enu('pet_type_pref', ['cao','gato','passaro','outro'])
      table.string('state', 63).notNullable()
      table.string('county', 63).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

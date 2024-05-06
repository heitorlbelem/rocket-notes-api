const knex = require("../database/knex")

class NotesController {
  async index(request, response) {
    const { user_id } = request.params
    console.log('oi')

    const tags = await knex("tags").where({ user_id })

    return response.json(tags)
  }
}

module.exports = NotesController
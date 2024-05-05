const knex = require("../database/knex")

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body
    const { user_id } = request.params

    const [note_id] = await knex("notes").insert({ title, description, user_id })

    const linksInsert = links.map(url => {
      return({
        url,
        note_id
      })
    })
    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return({
        name,
        note_id,
        user_id
      })
    })
    await knex("tags").insert(tagsInsert)

    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: note.id }).orderBy("name")
    const links = await knex("links").where({ note_id: note.id}).orderBy("created_at")

    return response.json({
      ...note,
      tags,
      links
    })
  }
}

module.exports = NotesController
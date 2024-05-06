const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class NotesController {
  async index(request, response) {
    const { title, user_id } = request.query

    const notes = await knex("notes")
      .whereLike("title", `%${title}%`)
      .where({ user_id })
      .orderBy("title")

    return response.json(notes)
  }

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
    const { id } = request.params

    const note = await knex("notes").where({ id }).first()
    const tags = await knex("tags").where({ note_id: note.id }).orderBy("name")
    const links = await knex("links").where({ note_id: note.id}).orderBy("created_at")

    return response.json({
      ...note,
      tags,
      links
    })
  }

  async delete(request, response) {
    const { id } = request.params

    const checkNoteExists = await knex("notes").where({ id }).first()
    if(!checkNoteExists) {
      throw new AppError("Nota não foi encontrada", 404)
    }

    await knex("notes").where({ id }).delete()

    return response.status(204).json()
  }
}

module.exports = NotesController
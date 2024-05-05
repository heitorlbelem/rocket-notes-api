exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id").primary()
  table.text("url").notNullable();

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")

  table.timestamps()
})

exports.down = knex => knex.schema.dropTable("links")

exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id").primary()
  table.text("title").notNullable();
  table.text("description")
  table.integer("user_id").references("id").inTable("users")

  table.timestamps()
})

exports.down = knex => knex.schema.dropTable("notes")

exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id").primary()
  table.text("name").notNullable();
  table.text("email").notNullable().unique();
  table.text("password").notNullable();

  table.timestamps()
}) 

exports.down = knex => knex.schema.dropTable("users")

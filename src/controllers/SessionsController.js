const { compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { sign } = require("jsonwebtoken")
const authConfig = require("../config/auth")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()
    if(!user) {
      throw new AppError("E-mail e/ou senha inválidos", 401)
    }

    const passwordMatched = await compare(password, user.password)
    if(!passwordMatched) {
      throw new AppError("E-mail e/ou senha inválidos", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })
    
    response.json({ token })
  }
}

module.exports = SessionsController
const { Router } = require("express")

const usersRoutes = Router()

const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()

function myMiddleware(request, response, next) {
  if(!request.body.isAdmin) {
    return response.status(401).json({ message: 'user unauthorized' })
  }

  next()
}

usersRoutes.post("/", myMiddleware, usersController.create)

module.exports = usersRoutes
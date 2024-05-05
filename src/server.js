const express = require("express")


const PORT = 3333
const app = express()

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/:id', (request, response) => {
  const { id } = request.params

  response.json({ message: `Olá ${id}` })
})

module.exports = app => {
  const comentario = require("../controller/comentarios.controller.js");

  // Create a new User
  app.post("/comentario", comentario.create);

  // Retrieve all Users
  app.get("/comentario", comentario.findAll);

  // Retrieve a single User with UserId
  app.get("/comentario/:comentarioId", comentario.findOne);

  // Update a Customer with UserId
  app.put("/comentario/:comentarioId", comentario.update);

  // Delete a Customer with UserId
  app.delete("/comentario/:comentarioId", comentario.delete);

  // Delete all
  app.delete("/comentario", comentario.deleteAll);
};
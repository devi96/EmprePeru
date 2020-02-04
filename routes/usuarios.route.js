module.exports = app => {
  const usuarios = require("../controller/usuarios.controller.js");

  // Create a new User
  app.post("/usuarios", usuarios.create);

  // Retrieve all Users
  app.get("/usuarios", usuarios.findAll);

  // Retrieve a single User with UserId
  app.get("/usuarios/:usuarioId", usuarios.findOne);

  // Update a Customer with UserId
  app.put("/usuarios/:usuarioId", usuarios.update);

  // Delete a Customer with UserId
  app.delete("/usuarios/:usuarioId", usuarios.delete);

  // Create a new User
  app.delete("/usuarios", usuarios.deleteAll);
};
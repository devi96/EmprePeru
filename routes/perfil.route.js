module.exports = app => {
  const perfil = require("../controller/perfil.controller.js");

  // Create a new User
  app.post("/perfil", perfil.create);

  // Retrieve all Users
  app.get("/perfil", perfil.findAll);

  // Retrieve a single User with UserId
  app.get("/perfil/:perfilId", perfil.findOne);

  // Update a Customer with UserId
  app.put("/perfil/:perfilId", perfil.update);

  // Delete a Customer with UserId
  app.delete("/perfil/:perfilId", perfil.delete);

  // Delete all
  app.delete("/perfil", perfil.deleteAll);
};
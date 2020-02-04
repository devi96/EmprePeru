module.exports = app => {
  const categoria = require("../controller/categorias.controller.js");

  // Create a new User
  app.post("/categoria", categoria.create);

  // Retrieve all Users
  app.get("/categoria", categoria.findAll);

  // Retrieve a single User with UserId
  app.get("/categoria/:categoriaId", categoria.findOne);

  // Update a Customer with UserId
  app.put("/categoria/:categoriaId", categoria.update);

  // Delete a Customer with UserId
  app.delete("/categoria/:categoriaId", categoria.delete);

  // Delete all
  app.delete("/categoria", categoria.deleteAll);
};
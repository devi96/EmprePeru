module.exports = app => {
  const historia = require("../controller/historias.controller.js");

  // Create a new User
  app.post("/historia", historia.create);

  // Retrieve all Users
  app.get("/historia", historia.findAll);

  // Retrieve a single User with UserId
  app.get("/historia/:historiaId", historia.findOne);

  // Update a Customer with UserId
  app.put("/historia/:historiaId", historia.update);

  // Delete a Customer with UserId
  app.delete("/historia/:historiaId", historia.delete);

  // Delete all
  app.delete("/historia", historia.deleteAll);
};
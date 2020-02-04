const Categoria = require("../model/categorias.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  		
		// Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
	  }

	  const categorias = new Categoria({
	  	nombre: req.body.nombre
	  });

	  // Save Customer in the database
	  Categoria.create(categorias, (err, data) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the historia."
	      });
	    else res.send(data);
	  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Categoria.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Categoria.findById(req.params.categoriaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.categoriaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.categoriaId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
	exports.update = (req, res) => {
	  // Validate Request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
	  }

	  Categoria.updateById(
	    req.params.categoriaId,
	    new Categoria(req.body),
	    (err, data) => {
	      if (err) {
	        if (err.kind === "not_found") {
	          res.status(404).send({
	            message: `Not found Customer with id ${req.params.categoriaId}.`
	          });
	        } else {
	          res.status(500).send({
	            message: "Error updating Customer with id " + req.params.categoriaId
	          });
	        }
	      } else res.send(data);
	    }
	  );
	};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Categoria.remove(req.params.categoriaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.categoriaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.categoriaId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};


// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Categoria.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categorias."
      });
    else res.send({ message: `All categorias were deleted successfully!` });
  });
};
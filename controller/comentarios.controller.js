const Comentario = require("../model/comentarios.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  		
		// Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
	  }

	  const comentario = new Comentario({
	  	contenido: req.body.contenido,
	  	fecha: req.body.fecha
	  });

	  // Save Customer in the database
	  Comentario.create(comentario, (err, data) => {
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
  Comentario.getAll((err, data) => {
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
    Comentario.findById(req.params.comentarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.comentarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.comentarioId
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

	  Comentario.updateById(
	    req.params.comentarioId,
	    new Comentario(req.body),
	    (err, data) => {
	      if (err) {
	        if (err.kind === "not_found") {
	          res.status(404).send({
	            message: `Not found Customer with id ${req.params.comentarioId}.`
	          });
	        } else {
	          res.status(500).send({
	            message: "Error updating Customer with id " + req.params.comentarioId
	          });
	        }
	      } else res.send(data);
	    }
	  );
	};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Comentario.remove(req.params.comentarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.comentarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.comentarioId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};


// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Comentario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
const Historia = require("../model/historias.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  	   
  	   console.log("esto llego del request",req.body);
		// Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
	  }
	  console.log("este es el mensaje", req.body.about.substring(19).replace('\\n\"}]}',""));

	  const historia = new Historia({
	  	titulo: req.body.display_name,
	  	contenido: req.body.about.ops[0].insert,
	  	fecha: new Date()
	  });

	  // Save Customer in the database
	  Historia.create(historia, (err, data) => {
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
  Historia.getAll((err, data) => {
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
    Historia.findById(req.params.historiaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.historiaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.historiaId
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

	  Historia.updateById(
	    req.params.historiaId,
	    new Historia(req.body),
	    (err, data) => {
	      if (err) {
	        if (err.kind === "not_found") {
	          res.status(404).send({
	            message: `Not found Customer with id ${req.params.historiaId}.`
	          });
	        } else {
	          res.status(500).send({
	            message: "Error updating Customer with id " + req.params.historiaId
	          });
	        }
	      } else res.send(data);
	    }
	  );
	};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Historia.remove(req.params.historiaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.historiaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.historiaId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};


// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Historia.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
const Historia = require("../model/historias.js");


// Create and Save a new Customer
exports.create = (req, res, next) => {
	   console.log("esto es el file",req.file); 
  	   console.log("esto llego del request completo",req);
  	   console.log("esto llego del request",req.body);
  	   var body = JSON.parse(JSON.stringify(req.body));
  	   console.log("este es el nuevo json",body);
		// Validate request
	  if (!req.body) {
	    res.status(400).send({
	      message: "Content can not be empty!"
	    });
	  }


	  console.log("valor de body.user_id",body.user_id);
	  console.log("otro valor",body["user_id"]);

	  const historia = new Historia({
	  	idusuarios: body.user_id,
	  	idcategorias: body.categoria,
	  	titulo: body.titulo,
	  	contenido: body.contenido,
	  	image: req.file.path
	  });

	  // Save Customer in the database
	  Historia.create(historia, (err, data) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while creating the historia."
	      });
	    else {
	    res.redirect("/");
		return;}
	  });
};

// Retrieve all Customers from the database.
exports.find_Category = (req,res) => {
 Historia.getCategory(req.body.idcategoria, (err,data) =>{
 	if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving historias."
      });
    else res.send(data);
 });
};

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
    } else {	
	    		console.log("QUIERO VER LA DATA DE TEC", data)
	    		res.render("historiaSingle",{
	    		bienvenido: req.flash("Bienvenido"),
		 		user: req.session.user,
				historia: data
				});
			}
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
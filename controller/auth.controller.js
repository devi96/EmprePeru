const Usuario = require("../model/usuarios.js");

// Create and Save a new Customer
exports.login = (req, res) => {
  	console.log(req.body);
  	
  	Usuario.find_Email_password(req.body.email, req.body.password,(err, data) => {
	    if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while loggin the perfil."
	      });
	    else{
	    	if(data.length){
	    		 req.session.user = data;
				 req.flash('message',"PASSWORD CORRECTO");
				 res.redirect("/");
	    	}else{
	    		 req.flash('message',"PASSWORD INCORRECTO");
				 res.redirect("/");
	    	}
	    } 
	  });
};


exports.log_out = (req, res) => {
  req.flash("message","Usted se ha deslogueado exitosamente");
  req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/');
};
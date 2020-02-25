const express = require('express');
//const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

const router = express.Router();
const Historia = require("../model/historias.js");
const Usuario = require("../model/usuarios.js");


router.get("/",(req,res) =>{
	res.render("index",{
		 bienvenido: req.flash("Bienvenido"),
		 user: req.session.user,
		 mensaje: req.flash("message")
	});
});

router.get("/index",(req,res) =>{
	res.redirect("/");
});


router.get("/login",(req,res)=>{
	res.render("login");	
});

router.get("/historia",(req,res)=>{
	res.render("historia");	
});

router.get("/tecnologia",(req,res)=>{

	Historia.getCategory(1, (err,data) =>{
	 	if (err)
	      res.status(500).send({
	        message:
	          err.message || "Some error occurred while retrieving historias."
	      });
	    else {	
	    		console.log("QUIERO VER LA DATA DE TEC", data)
	    		res.render("tecnologia",{
	    		bienvenido: req.flash("Bienvenido"),
		 		user: req.session.user,
				historias_tecnologia: data
				});
			}
	 }); 
});

router.get("/contacto",(req,res)=>{
	res.render("contacto");	
});


router.get("/blog",(req,res)=>{
	res.render("blog");	
});


router.get("/registro",(req,res)=>{
	res.render("registro");	
});

router.get("/editor",(req,res)=>{
	res.render("editor_historias",{
		user: req.session.user
	});	
});

router.post("/enviar_mensaje",(req,res)=>{
	console.log("este es req:",req.body);

	// using Twilio SendGrid's v3 Node.js Library
	// https://github.com/sendgrid/sendgrid-nodejs
	
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
	  to: req.body.correo,
	  from: 'usuario@example.com',
	  subject: 'Respuesta a tu historia de exito',
	  text: req.body.contenido,
	  html: '<strong>Gracias por usar Empreperu</strong>',
	};
	sgMail.send(msg);

	res.render("index",{
		 bienvenido: req.flash("Bienvenido"),
		 user: req.session.user,
		 mensaje: req.flash("message")
	});
});

router.get("/:historiaId",(req,res)=>{
	
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
    			console.log("QUIERO VER LA DATA DE TEC", data);
    			Usuario.findById(data[0].idusuarios, (err, dataUsuario) => {
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
			    	
			    	console.log("QUIERO VER LA DATA DE USUARIO", dataUsuario);
			    	
		    		res.render("historiaSingle",{
		    		bienvenido: req.flash("Bienvenido"),
			 		user: req.session.user,
					historia: data[0],
					email: dataUsuario[0].email
					});	
			    }});

    			console.log("OCURRIO UN ERROR");
	    		
			}
  });
});



module.exports = router;
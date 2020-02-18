const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const Historia = require("../model/historias.js");


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
	    		console.log("QUIERO VER LA DATA DE TEC", data)
	    		res.render("historiaSingle",{
	    		bienvenido: req.flash("Bienvenido"),
		 		user: req.session.user,
				historia: data[0]
				});
			}
  });
});



module.exports = router;
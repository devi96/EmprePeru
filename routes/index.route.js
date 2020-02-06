const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();

router.get("/",(req,res) =>{
	res.render("index",{
		 bienvenido: req.flash("Bienvenido"),
		 user: req.session.user,
		 mensaje: req.flash("message")
	});
});

router.get("/index",(req,res) =>{
	res.render("index");
});


router.get("/login",(req,res)=>{
	res.render("login");	
});

router.get("/historia",(req,res)=>{
	res.render("historia");	
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
	res.render("editor");	
});


module.exports = router;
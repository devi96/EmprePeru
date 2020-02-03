const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();

router.get("/",(req,res) =>{
	res.render("index");
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


module.exports = router;
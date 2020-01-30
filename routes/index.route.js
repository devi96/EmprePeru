const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();

router.get("/",(req,res) =>{
	res.render("login");
});

router.get("/usuarioEmpresarioDashboard",(req,res)=>{
	res.render("usuarioEmpresarioDashboard");	
});

router.get("/usuarioNormalDashboard",(req,res)=>{
	res.render("usuarioNormalDashboard");	
});

router.get("/historiaExito",(req,res)=>{
	res.render("historiaExito");	
});


router.get("/registroUsuario",(req,res)=>{
	res.render("registroUsuario");	
});


module.exports = router;
'use strict'

var mongoose=require('mongoose');
var app=require('./app');
var port=3700;
mongoose.Promise=global.Promise;
const uri = "mongodb+srv://restaurante:ZTVFtU1nAQAHOKFe@sandbox.ba7pr.mongodb.net/restaurante?retryWrites=true&w=majority";
mongoose.connect(uri)
	.then(()=>{
		console.log("Conexión a la base de datos con exito...");
		//Creación del servidor
		app.listen(port, ()=>{
			console.log("Servidor corriendo en la url: localhost:3700");
		});

	})
	.catch(error=>console.log(error));

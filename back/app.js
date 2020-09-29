'use strict'
var express = require('express');
var bodyParser=require('body-parser');

var app= express();
//cargar archivo de rutas
var restaurante_routers=require('./routers/restaurante');
//middlewares -- se ejecuta antes del resultado de la petición
app.use(bodyParser.urlencoded({extended:false}));	//casting de lo que llegue a un objeto json
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use('/api', restaurante_routers);

//exportar modulo
module.exports=app;
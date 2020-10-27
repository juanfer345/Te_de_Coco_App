'use strict'

var express= require('express');
var RestauranteController=require('../controllers/restaurante');

var router= express.Router();

router.get('/home',RestauranteController.home);

//Metodos insertar objectos en la BD
router.post('/saveProduct',RestauranteController.saveProduct);
router.get('/product/:id?/:value?',RestauranteController.getProduct);	//Parametro opcional
router.get('/products',RestauranteController.getProducts);
router.put('/product/:id?/:value?',RestauranteController.updateProduct);
router.delete('/product/:id?/:value?',RestauranteController.deleteProduct);	
//Metodo para los objetos insertados por un restaurante anterior
router.delete('/products',RestauranteController.deleteProducts);	

module.exports=router;

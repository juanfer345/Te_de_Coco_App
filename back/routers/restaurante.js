'use strict'

var express= require('express');
var RestauranteController=require('../controllers/restaurante');

var router= express.Router();

router.get('/home',RestauranteController.home);
//Metodos para platos y bebidas
router.post('/save-food',RestauranteController.saveFood);
router.get('/food/:id?/:value?',RestauranteController.getFood);	//Parametro opcional
router.get('/foods',RestauranteController.getFoods);
router.put('/food/:id?/:value?',RestauranteController.updateFood);
router.delete('/food/:id?/:value?',RestauranteController.deleteFood);		

//Metodos para caracteristicas del restaurante
router.post('/admin/features',RestauranteController.saveFeatures);
router.get('/admin/features',RestauranteController.getFeatures);

module.exports=router;

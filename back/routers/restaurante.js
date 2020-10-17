'use strict'

var express= require('express');
var RestauranteController=require('../controllers/restaurante');

var router= express.Router();

router.get('/home',RestauranteController.home);
//Metodo para limpiar colecciones de un restaurante anterior
router.delete('/collections',RestauranteController.deleteCollections);
//Metodos para platos y bebidas
router.post('/save-food',RestauranteController.saveFood);
router.get('/food/:id?/:value?',RestauranteController.getFood);	//Parametro opcional
router.get('/foods',RestauranteController.getFoods);
router.put('/food/:id?/:value?',RestauranteController.updateFood);
router.delete('/food/:id?/:value?',RestauranteController.deleteFood);	
router.delete('/foods',RestauranteController.deleteFoods);	

//Metodos para caracteristicas del restaurante
router.post('/admin/features',RestauranteController.saveFeatures);
router.get('/admin/features',RestauranteController.getFeatures);
router.put('/admin/feature/:id?/:value?',RestauranteController.updateFeature);
router.delete('/admin/features',RestauranteController.deleteFeatures);		

//Metodos para las ordenes del retaurante
router.post('/save-order',RestauranteController.saveOrder);
router.get('/order/:id?/:value?',RestauranteController.getOrder);
router.get('/orders',RestauranteController.getOrders);
router.put('/order/:id?/:value?',RestauranteController.updateOrder);
router.delete('/order/:id?/:value?',RestauranteController.deleteOrder);
router.delete('/orders',RestauranteController.deleteOrders);	

//Metodos para los usuarios
router.post('/save-user',RestauranteController.saveUser);
router.get('/user/:id?/:value?',RestauranteController.getUser);
router.get('/users',RestauranteController.getUsers);
router.put('/user/:id?/:value?',RestauranteController.updateUser);
router.delete('/user/:id?/:value?',RestauranteController.deleteUser);
router.delete('/users',RestauranteController.deleteUsers);	

module.exports=router;

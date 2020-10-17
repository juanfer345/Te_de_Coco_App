'use strict'

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//Se definen modelos vacios que pueden cambiar
var FoodtSchema = Schema({},{strict: false});
var FeaturestSchema = Schema({},{strict: false});
var OrderSchema = Schema({},{strict: false});
var UserSchema = Schema({},{strict: false});

var controller={
	home: function(req, resp){
		return resp.status(200).send({
			message: 'Bienvenido al Restaurante'
		});
	},
	saveFood: function(req,resp) {
		
		let params=req.body;
		let newSchema={};
		let iterator;
		//Creación de variabkes del nuevo modelo
		for (iterator in params){
			newSchema[iterator]=typeof(params[iterator]);
	
		}	
		FoodtSchema.add(newSchema);
		mongoose.models = {}
		let Food=mongoose.model('foods',FoodtSchema);

		let food= new Food();
		//LLenar el objeto a guardar en la colección food
		for (iterator in params){
			food[iterator]=params[iterator];
		}

		food.save((error, foodtStored)=>{
			if(error){
				return resp.status(500).send({
					message: 'Error al guardar la data'
				});
			}
			if(!foodtStored){
				return resp.status(404).send({
					message:"No se ha podido guardar la data"
				});
			}
			return resp.status(200).send({food: foodtStored});
		});
	   	
     
	},
	getFood: function(req,resp){
		let Food= mongoose.model('foods',FoodtSchema);

		let foodtId=req.params.id;
		let foodtValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[foodtId]=foodtValue;

		if(!foodtId || !foodtValue){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+foodtId});
		}
		
		Food.find(query).exec((error, foodReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!foodReturn){
				return resp.status(404).send({message:'No se ha encontrado la comida'});
			}
			return resp.status(200).send({food: foodReturn});
		});
	},
	getFoods: function(req, resp){
		let Food= mongoose.model('foods',FoodtSchema);
		Food.find({}).exec((error,foodReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!foodReturn){
				return resp.status(404).send({message:'No hay info en la BD'});
			}
			return resp.status(200).send({foodReturn});
		});
	},
	updateFood: function(req, resp){
		let Food = mongoose.model('foods',FoodtSchema);
		let foodId=req.params.id;
		let foodValue=req.params.value;
		let query={};
		query[foodId]=foodValue;
		if(!foodId){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+foodtId});
		}

		var update= req.body;
		Food.findOneAndUpdate(query, update,{new:true}, (error,foodUpdate)=>{
			if(error){
				return resp.status(500).send({message:'Error al actualizar los datos'});
			}
			if(!foodUpdate){
				return resp.status(404).send({message:'No se encontro el proyecto a actualizar'});
			}
			return resp.status(200).send({foodUpdate});
		});
	},
	deleteFood: function(req, resp){
		let Food = mongoose.model('foods',FoodtSchema);
		let foodId=req.params.id;
		let foodValue=req.params.value;
		let query={};
		query[foodId]=foodValue;
		if(!foodId){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+foodId});
		}
		
		Food.findOneAndRemove(query, (error, foodRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!foodRemoved){
				return resp.status(404).send({message:'No se encontro el proyecto a borrar'});
			}
			return resp.status(200).send({foodRemoved});
		});
	},
	deleteFoods: function(req, resp){
		let Food = mongoose.model('foods',FoodtSchema);
		//Remove all features
		Food.remove({}, (error, foodsRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!foodsRemoved){
				return resp.status(404).send({message:'No se encontro el proyecto a borrar'});
			}
			return resp.status(200).send({foodsRemoved});
		});
	},
	saveFeatures: function(req,resp) {
		let params=req.body;
		let newSchema={};
		let iterator;
		//Creación de variabkes del nuevo modelo
		for (iterator in params){
			newSchema[iterator]=typeof(params[iterator]);
		}	
		FeaturestSchema.add(newSchema);
		mongoose.models = {}
		let Feature= mongoose.model('features',FeaturestSchema);
		let feature= new Feature();
		
		//LLenar el objeto a guardar en la colección food
		for (iterator in params){
			feature[iterator]=params[iterator];
		}

		feature.save((error, featureStored)=>{
			if(error){
				return resp.status(500).send({
					message: 'Error al guardar la data'
				});
			}
			if(!featureStored){
				return resp.status(404).send({
					message:"No se ha podido guardar la data"
				});
			}
			return resp.status(200).send({feature: featureStored});
		});
	},
	getFeatures: function(req, resp){
		let Feature= mongoose.model('features',FeaturestSchema);
		Feature.find({}).exec((error,featuredReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!featuredReturn){
				return resp.status(404).send({message:'No hay info en la BD'});
			}
			return resp.status(200).send({featuredReturn});
		});
	},
	updateFeature: function(req, resp){
		let Feature= mongoose.model('features',FeaturestSchema);
		let featureId=req.params.id;
		let featureValue=req.params.value;
		let query={};
		query[featureId]=featureValue;
		if(!featureId){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+featureId});
		}
		var update= req.body;
		Feature.findOneAndUpdate(query, update,{new:true}, (error,featureUpdate)=>{
			if(error){
				return resp.status(500).send({message:'Error al actualizar los datos'});
			}
			if(!featureUpdate){
				return resp.status(404).send({message:'No se encontro el proyecto a actualizar'});
			}
			return resp.status(200).send({featureUpdate});
		});
	},
	deleteFeatures: function(req, resp){
		let Feature= mongoose.model('features',FeaturestSchema);
		//Remove all features
		Feature.remove({}, (error, featuresRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!featuresRemoved){
				return resp.status(404).send({message:'No se encontro el proyecto a borrar'});
			}
			return resp.status(200).send({featuresRemoved});
		});
	},
	deleteCollections: function(req,resp){
		let Food = mongoose.model('foods',FoodtSchema);
		let Feature= mongoose.model('features',FeaturestSchema);
		let Order= mongoose.model('orders',OrderSchema);
		let User= mongoose.model('users',UserSchema);
		Food.remove({}, (error, foodsRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
		});
		Feature.remove({}, (error, featuresRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
		});
		Order.remove({}, (error, ordersRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
		});
		User.remove({}, (error, usersRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
		});

		return resp.status(200).send({message: "Great, all cleaned"});
	},
	saveOrder: function(req,resp) {
		let params=req.body;
		let newSchema={};
		let iterator;
		//Creación de variabkes del nuevo modelo
		for (iterator in params){
			newSchema[iterator]=typeof(params[iterator]);
		}	
		OrderSchema.add(newSchema);
		mongoose.models = {}
		let Order= mongoose.model('orders',OrderSchema);
		let order= new Order();
		
		//LLenar el objeto a guardar en la colección food
		for (iterator in params){
			order[iterator]=params[iterator];
		}

		order.save((error, orderStored)=>{
			if(error){
				return resp.status(500).send({
					message: 'Error al guardar la data'
				});
			}
			if(!orderStored){
				return resp.status(404).send({
					message:"No se ha podido guardar la data"
				});
			}
			return resp.status(200).send({order: orderStored});
		});
	},
	getOrder: function(req,resp){
		let Order= mongoose.model('orders',OrderSchema);
		let ordertId=req.params.id;
		let orderValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[ordertId]=orderValue;

		if(!ordertId || !orderValue){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+ordertId});
		}
		
		Order.find(query).exec((error, orderReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!orderReturn){
				return resp.status(404).send({message:'No se ha encontrado la comida'});
			}
			return resp.status(200).send({order: orderReturn});
		});
	},
	getOrders: function(req, resp){
		let Order= mongoose.model('orders',OrderSchema);
		Order.find({}).exec((error,orderReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!orderReturn){
				return resp.status(404).send({message:'No hay info en la BD'});
			}
			return resp.status(200).send({orderReturn});
		});
	},
	updateOrder: function(req, resp){
		let Order= mongoose.model('orders',OrderSchema);
		let ordertId=req.params.id;
		let orderValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[ordertId]=orderValue;

		if(!ordertId || !orderValue){
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+ordertId});
		}
		var update= req.body;
		Order.findOneAndUpdate(query, update,{new:true}, (error,orderUpdate)=>{
			if(error){
				return resp.status(500).send({message:'Error al actualizar los datos'});
			}
			if(!orderUpdate){
				return resp.status(404).send({message:'No se encontro el proyecto a actualizar'});
			}
			return resp.status(200).send({orderUpdate});
		});
	},
	deleteOrder: function(req, resp){
		let Order= mongoose.model('orders',OrderSchema);
		let ordertId=req.params.id;
		let orderValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[ordertId]=orderValue;
		if(!ordertId || !orderValue){
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+ordertId});
		}
		
		Order.findOneAndRemove(query, (error, orderRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!orderRemoved){
				return resp.status(404).send({message:'No se encontro el proyecto a borrar'});
			}
			return resp.status(200).send({orderRemoved});
		});
	},
	deleteOrders: function(req, resp){
		let Order= mongoose.model('orders',OrderSchema);
		//Remove all features
		Order.remove({}, (error, ordersRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!ordersRemoved){
				return resp.status(404).send({message:'No se encontro nada a borrar'});
			}
			return resp.status(200).send({ordersRemoved});
		});
	},
	saveUser: function(req,resp) {
		let params=req.body;
		let newSchema={};
		let iterator;
		//Creación de variabkes del nuevo modelo
		for (iterator in params){
			newSchema[iterator]=typeof(params[iterator]);
		}	
		UserSchema.add(newSchema);
		mongoose.models = {}
		let User= mongoose.model('users',UserSchema);
		let user= new User();
		
		//LLenar el objeto a guardar en la colección food
		for (iterator in params){
			user[iterator]=params[iterator];
		}

		user.save((error, userStored)=>{
			if(error){
				return resp.status(500).send({
					message: 'Error al guardar la data'
				});
			}
			if(!userStored){
				return resp.status(404).send({
					message:"No se ha podido guardar la data"
				});
			}
			return resp.status(200).send({order: userStored});
		});
	},
	getUser: function(req,resp){
		let User= mongoose.model('users',UserSchema);
		let usertId=req.params.id;
		let userValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[usertId]=userValue;

		if(!usertId || !userValue){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+usertId});
		}
		
		User.find(query).exec((error, userReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!userReturn){
				return resp.status(404).send({message:'No se ha encontrado la comida'});
			}
			return resp.status(200).send({order: userReturn});
		});
	},
	getUsers: function(req, resp){
		let User= mongoose.model('users',UserSchema);
		User.find({}).exec((error,userReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!userReturn){
				return resp.status(404).send({message:'No hay info en la BD'});
			}
			return resp.status(200).send({userReturn});
		});
	},
	updateUser: function(req, resp){
		let User= mongoose.model('users',UserSchema);
		let usertId=req.params.id;
		let userValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[usertId]=userValue;

		if(!usertId || !userValue){
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+usertId});
		}
		var update= req.body;
		User.findOneAndUpdate(query, update,{new:true}, (error,userUpdate)=>{
			if(error){
				return resp.status(500).send({message:'Error al actualizar los datos'});
			}
			if(!userUpdate){
				return resp.status(404).send({message:'No se encontro el proyecto a actualizar'});
			}
			return resp.status(200).send({userUpdate});
		});
	},
	deleteUser: function(req, resp){
		let User= mongoose.model('users',UserSchema);
		let usertId=req.params.id;
		let userValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[usertId]=userValue;

		if(!usertId || !userValue){
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+usertId});
		}
		
		User.findOneAndRemove(query, (error, userRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!userRemoved){
				return resp.status(404).send({message:'No se encontro el proyecto a borrar'});
			}
			return resp.status(200).send({userRemoved});
		});
	},
	deleteUsers: function(req, resp){
		let User= mongoose.model('users',UserSchema);
		//Remove all features
		User.remove({}, (error, userRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!userRemoved){
				return resp.status(404).send({message:'No se encontro nada a borrar'});
			}
			return resp.status(200).send({userRemoved});
		});
	}
};

module.exports=controller;

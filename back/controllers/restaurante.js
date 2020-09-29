'use strict'

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//El modelo puede cambiar
var FoodtSchema = Schema({
},{strict: false});

var FeaturestSchema = Schema({
},{strict: false});

var controller={
	home: function(req, resp){
		return resp.status(200).send({
			message: 'Bienvenido al Restaurante'
		});
	},

	/**
	 * post /save-food/
	 * Este metodo se llama al inicializar la base de datos
	 * para cada comida en body
	 * body contiene los parametros parseados del diagrama
	 *
	 * @param req
	 * @param resp
	 */
	saveFood: function(req,resp) {
		let params=req.body;
		let newSchema={};
		let iterator;
		//Creación de variabkes del nuevo modelo
		for (iterator in params){
			newSchema[iterator]=typeof(params[iterator]);
	
		}	
		FoodtSchema.add(newSchema);

		let Food= mongoose.model('foods',FoodtSchema);
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

	/**
	 *
	 * @param req
	 * @param resp
	 * @return {this}
	 */
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
	saveFeatures: function(req,resp) {
		let params=req.body;
		let newSchema={};
		let iterator;
		//Creación de variabkes del nuevo modelo
		for (iterator in params){
			newSchema[iterator]=typeof(params[iterator]);
		}	
		FeaturestSchema.add(newSchema);

		let Feature= mongoose.model('features',FeaturestSchema);
		let feature= new Feature();
		
		//LLenar el objeto a guardar en la colección food
		for (iterator in params){
			feature[iterator]=params[iterator];
		}

		feature.save((error, foodtStored)=>{
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
	}
};

module.exports=controller;

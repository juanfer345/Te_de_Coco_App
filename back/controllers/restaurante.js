'use strict'

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//Se definen modelos vacios que pueden cambiar
var ProductSchema = Schema({},{strict: false});

var controller={
	home: function(req, resp){
		return resp.status(200).send({
			message: 'Bienvenido al BackEnd del Proyecto de TeCoCo'
		});
	},
	saveProduct: function(req,resp) {
		
		let params=req.body;
		let newSchema={};
		let iterator;
		//Creación de variabkes del nuevo modelo
		for (iterator in params){
			newSchema[iterator]=typeof(params[iterator]);
	
		}	
		ProductSchema.add(newSchema);
		mongoose.models = {}
		let Product=mongoose.model('products',ProductSchema);

		let product= new Product();
		//LLenar el objeto a guardar en la colección Product
		for (iterator in params){
			product[iterator]=params[iterator];
		}

		product.save((error, ProducttProductd)=>{
			if(error){
				return resp.status(500).send({
					message: 'Error al guardar la data'
				});
			}
			if(!ProducttProductd){
				return resp.status(404).send({
					message:"No se ha podido guardar la data"
				});
			}
			return resp.status(200).send({Product: ProducttProductd});
		});
	   	
     
	},
	getProduct: function(req,resp){
		let Product= mongoose.model('products',ProductSchema);

		let productId=req.params.id;
		let productValue=req.params.value;
		//Tupla clave valor a buscar
		let query={};
		query[productId]=productValue;

		if(!productId || !productValue){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+productId});
		}
		
		Product.find(query).exec((error, ProductReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!ProductReturn){
				return resp.status(404).send({message:'No se encontro el producto a actualizar'});
			}
			return resp.status(200).send({Product: ProductReturn});
		});
	},
	getProducts: function(req, resp){
		let Product= mongoose.model('products',ProductSchema);
		Product.find({}).exec((error,ProductReturn)=>{
			if(error){
				return resp.status(500).send({message:'Error al devolver los datos'});
			}
			if(!ProductReturn){
				return resp.status(404).send({message:'No hay info en la BD'});
			}
			return resp.status(200).send({ProductReturn});
		});
	},
	updateProduct: function(req, resp){
		let Product = mongoose.model('products',ProductSchema);
		let ProductId=req.params.id;
		let ProductValue=req.params.value;
		let query={};
		query[ProductId]=ProductValue;
		if(!ProductId){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+ProductId});
		}

		var update= req.body;
		Product.findOneAndUpdate(query, update,{new:true}, (error,ProductUpdate)=>{
			if(error){
				return resp.status(500).send({message:'Error al actualizar los datos'});
			}
			if(!ProductUpdate){
				return resp.status(404).send({message:'No se encontro el producto a actualizar'});
			}
			return resp.status(200).send({ProductUpdate});
		});
	},
	deleteProduct: function(req, resp){
		let Product = mongoose.model('products',ProductSchema);
		let ProductId=req.params.id;
		let ProductValue=req.params.value;
		let query={};
		query[ProductId]=ProductValue;
		if(!ProductId){ 
			return resp.status(404).send({message:'No se han pasado parametros de busqueda para: '+ProductId});
		}
		
		Product.findOneAndRemove(query, (error, ProductRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!ProductRemoved){
				return resp.status(404).send({message:'No se encontro el producto a borrar'});
			}
			return resp.status(200).send({ProductRemoved});
		});
	},
	deleteProducts: function(req, resp){
		let Product = mongoose.model('products',ProductSchema);
		//Remove all features
		Product.remove({}, (error, ProductRemoved)=>{
			if(error){
				return resp.status(500).send({message:'Error al borrar los datos'});
			}
			if(!ProductRemoved){
				return resp.status(404).send({message:'No se encontraron productos a borrar'});
			}
			return resp.status(200).send({ProductRemoved});
		});
	}
};

module.exports=controller;

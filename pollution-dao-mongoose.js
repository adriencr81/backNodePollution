import mongoose, { Mongoose } from "mongoose";
import dbMongoose from './db-mongoose.js'
import genericPromiseMongoose from "./generic-promise-mongoose.js";

var thisSchema;
var thisDb = dbMongoose.thisDb;
var ThisPersistentModel; 

function initMongooseWithSchemaAndModel () {

    //default auto generated objectId of mongoDB is better than number auto_incr
    //because it is more unique (no problem with objectId, but risk of same id  if auto_incr is reset)
   
    mongoose.Connection = thisDb;
      thisSchema = new mongoose.Schema({
        _id: { type : Object , alias : "id" } ,
        city: { type : String , alias : "ville" } ,
        
        
      });
     
      //NB: initialement/habituellement  nom: { type : String  } ou bien  name: { type : String  }
      //ici/exceptionellement nom: { type : String , alias : "name" } pour des raisons
      //de compatibilité entre plusieurs versions des clients/frontends (angular , ... : 2018 à 2022)

      thisSchema.set('id',false); //no default virtual id alias for _id
      thisSchema.set('toJSON', { virtuals: true , 
                                   versionKey:false,
                                   transform: function (doc, ret) {   delete ret._id;  }
                                 });                             
      //console.log("mongoose thisSchema : " + JSON.stringify(thisSchema) );
      //"Devise" model name is "devises" collection name in mongoDB  database
      ThisPersistentModel = mongoose.model('pollution', thisSchema);
}

initMongooseWithSchemaAndModel();

function findAll() {
    return genericPromiseMongoose.findAllWithModel(ThisPersistentModel );
}

function findByCriteria(criteria) {
    return genericPromiseMongoose.findByCriteriaWithModel(criteria,ThisPersistentModel);
  }

export default { ThisPersistentModel, findAll, findByCriteria};
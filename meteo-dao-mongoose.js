import mongoose, { Mongoose } from "mongoose";
import dbMongoose from './db-mongoose.js'
import genericPromiseMongoose from "./generic-promise-mongoose.js";

var thisSchema;
var thisDb = dbMongoose.thisDb;
var ThisPersistentModel; 

function initMongooseWithSchemaAndModel () {

 
   
    mongoose.Connection = thisDb;
      thisSchema = new mongoose.Schema({
        _id: { type : Object , alias : "id" } ,
        city: { type : String , alias : "ville" } ,
        wind: { type : Number , alias : "vent" } ,
        
      });
     
    

      thisSchema.set('id',false); 
      thisSchema.set('toJSON', { virtuals: true , 
                                   versionKey:false,
                                   transform: function (doc, ret) {   delete ret._id;  }
                                 });                             
     
      ThisPersistentModel = mongoose.model("meteo", thisSchema, "meteo");
}

initMongooseWithSchemaAndModel();

function findAll() {
    return genericPromiseMongoose.findAllWithModel(ThisPersistentModel );
}

function findByCriteria(criteria) {
    return genericPromiseMongoose.findByCriteriaWithModel(criteria,ThisPersistentModel);
  }

export default { ThisPersistentModel, findAll, findByCriteria};
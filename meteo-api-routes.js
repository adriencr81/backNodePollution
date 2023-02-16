import express from 'express';
import axios from 'axios';
const apiRouter = express.Router();
import meteoDaoMongoose from './meteo-dao-mongoose.js';
import meteoDao from './meteo-dao-mongoose.js';
var PersistentMeteoModel = meteoDao.ThisPersistentModel;

function statusCodeFromEx(ex){
	let status = 500;
	let error = ex?ex.error:null ; 
	switch(error){
		case "BAD_REQUEST" : status = 400; break;
		case "NOT_FOUND" : status = 404; break;
		//...
		case "CONFLICT" : status = 409; break;
		default: status = 500;
	}
	return status;
}

apiRouter.route('/meteoapi/all')
.get( async function(req, res, next ){
    try{
		var mymeteo = meteoDaoMongoose.ThisPersistentModel;
        let meteo = await mymeteo.find({});
       // console.log(meteo + "meteo")
        res.send(meteo);
    } catch(ex) {
        res.status(statusCodeFromEx(ex)).send(ex);
    }
});

apiRouter.route('/meteoc')
.get( async function(req, res, next ){
    try{
        let meteo = await meteoDao.findByCriteria({});
        res.send(meteo);
    } catch(ex) {
        res.status(statusCodeFromEx(ex)).send(ex);
    }
});

export  default { apiRouter };
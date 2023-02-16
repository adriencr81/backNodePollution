import express from 'express';
import axios from 'axios';
const apiRouter = express.Router();
import pollutionDaoMongoose from './pollution-dao-mongoose.js';
import pollutionDao from './pollution-dao-mongoose.js';
var PersistentPollutionModel = pollutionDao.ThisPersistentModel;

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

apiRouter.route('/pollutionapi/all')
.get( async function(req, res, next ){
    try{
		var mypollution = pollutionDaoMongoose.ThisPersistentModel;
        let pollution = await mypollution.find({});
        res.send(pollution);
    } catch(ex) {
        res.status(statusCodeFromEx(ex)).send(ex);
    }
});



export  default { apiRouter };
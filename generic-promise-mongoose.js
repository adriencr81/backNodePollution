function findAllWithModel(PersistentModel) {
    return new Promise( (resolve,reject)=>{
        PersistentModel.findAll( 
            function(err,entity){
                 if(err) reject({error:'can not find by id' , cause : err});
                 else if(entity == null) reject({error:'NOT_FOUND' , 
                                                 reason : "no entity found with id="+id});
                 else resolve(entity);
            });
      }); 
}
function findByCriteriaWithModel(criteria,PersistentModel) {
    return new Promise( (resolve,reject)=>{
      PersistentModel.find( criteria ,
                         function(err,entities){
                          if(err) reject({error:'can not find' , cause :err });
                          else  resolve(entities);
                        });
    });
  }
export default { findAllWithModel, findByCriteriaWithModel}
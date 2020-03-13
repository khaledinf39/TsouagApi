const  mongoose=require('mongoose');
const termSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    titel:{type: String ,required: true},
    body:{type: String ,required: true}
    ,storeID:{type: String ,required: true}

});

module.exports=mongoose.model('Terms_Condutions_Client',termSchemma);
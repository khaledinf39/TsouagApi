const  mongoose=require('mongoose');
const termSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date_time:{type: String ,required: true, default: Date.now},
    titel:{type: String ,required: true},
    body:{type: String ,required: true}
    ,storeID:{type: String ,required: true}

});

module.exports=mongoose.model('Terms_Condutions_Supplier',termSchemma);
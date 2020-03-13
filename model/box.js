const  mongoose=require('mongoose');
const boxSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    date_time:{type: Date ,required: true, default: Date.now},
    price:{type: String ,required: false}
    ,storeID:{type: String ,required: true}

});

module.exports=mongoose.model('Box',boxSchemma);
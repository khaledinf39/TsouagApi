const  mongoose=require('mongoose');
const boxSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    ordersID:{type: String ,required: false},
    date_time:{type: String ,required: true},
    price:{type: String ,required: false}
    ,storeID:{type: String ,required: true}

});

module.exports=mongoose.model('Box',boxSchemma);
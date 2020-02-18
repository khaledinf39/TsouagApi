
const  mongoose=require('mongoose');
const electronique_baymentsSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    orderID:{type: String ,required: false},
    date_time:{type: String ,required: true},
    price:{type: String ,required: false}
    ,storeID:{type: String ,required: true}
    

});

module.exports=mongoose.model('Electronique_bayments',electronique_baymentsSchemma);
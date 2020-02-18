const  mongoose=require('mongoose');
const expensesSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    desc:{type: String ,required: false},
    date_time:{type: String ,required: true},
    price:{type: String ,required: false}
    ,storeID:{type: String ,required: true}

});

module.exports=mongoose.model('Expenses',expensesSchemma);
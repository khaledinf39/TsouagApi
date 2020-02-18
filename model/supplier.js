const  mongoose=require('mongoose');
const supplierSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    phone:{type :String,required:true ,unique:true},
    email:{type :String,required:false },
    FCMtoken:{type: String ,required: true},
    lat:{type: String ,required: true},
    lng:{type: String ,required: true},
    ordersID:{type: String ,required: false},
    status:{type: Boolean ,required: true},
    password:{type: String ,required: true},
    image:{type: String ,required: false}
    ,storeID:{type: String ,required: true}
});

module.exports=mongoose.model('Supplier',supplierSchemma);
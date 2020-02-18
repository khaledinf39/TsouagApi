const  mongoose=require('mongoose');
const storeSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    phone:{type :String,required:true ,unique:true},
    email:{type :String,required:false },
    FCMtoken:{type: String ,required: true},
    lat:{type: String ,required: true},
    lng:{type: String ,required: true},
    store_name_ar:{type: String ,required: false},
    store_name_en:{type: String ,required: false},
    user_name:{type: String ,required: false},
    commerceID:{type: String ,required: false},
    website:{type: String ,required: false},
    date_ins:{type: String ,required: false},
    status:{type: Boolean ,required: true},
    password:{type: String ,required: true},
    image:{type: String ,required: false}
});

module.exports=mongoose.model('Store',storeSchemma);

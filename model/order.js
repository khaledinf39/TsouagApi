const  mongoose=require('mongoose');
//product
const orderSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    bayment_type:{type: Number ,required: true},
    sub_total:{type: String ,required: false},
    QRcode:{type: String ,required: false},
    status:{type: Number ,required: true}
    ,userID:{type: String ,required: true}
    ,user_name:{type: String ,required: false}
    ,user_address:{type: String ,required: false}
    ,user_phone:{type: String ,required: true}
    ,storeID:{type: String ,required: true}
    ,create_at:{type: Date, required: true, default: Date.now }
    
    ,products:[
        {
            _id:mongoose.Schema.Types.ObjectId,
           
            name:{type: String ,required: true},
            quantity:{type: String ,required: true},
            image:{type: String ,required: true},
            unity:{type: String ,required: true},
            price:{type: String ,required: true},
           
            
        
        }
    ]
    

});



module.exports=mongoose.model('Order',orderSchemma);

const  mongoose=require('mongoose');
//product
const productSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    name:{type: String ,required: true},
    description:{type: String ,required: true},
    quantity:{type: Number ,required: false},
    quantity_sold:{type: Number ,required: false},
    QRcode:{type: String ,required: false},
    status:{type: Number ,required: true}
    ,categorieID:{type: String ,required: true}
    ,prices:[
    {
    // _id:mongoose.Schema.Types.ObjectId,
    _id:{type: Number ,required: true},
   
    unity:{type: String ,required: true},
    price:{type: String ,required: true},
   
    

}
]
,images:[{type: String ,required: false}]
    ,storeID:{type: String ,required: true}
    ,supplierID:{type: String ,required: true}
    
    

});

//price
const priceSchemma=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   
    unity:{type: String ,required: true},
    price:{type: String ,required: true},
   
    

});

// var price=mongoose.model('Price',productSchemma);
module.exports=mongoose.model('Product',productSchemma);
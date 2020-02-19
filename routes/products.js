var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Product=require('../model/product');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
var path = require('path');
///////for upload images///////////////////
const multer=require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, 
      // file.originalname)
       Date.now() + '-' +  file.originalname)
  }
});
var upload = multer({storage: storage});

///////////////////////////////////////////////////////////////////////
/* GET users listing. */

const JWT_word="khaled";
router.post('/upload',upload.single('img'), function(req, res, next) {
    console.log(req.file);

    let host = req.host;
    let port=process.env.PORT || 8080;
const filePath = req.protocol + "://" + host +':'+port+ '/uploads/' + req.file.filename;

res.status(201).json({
  result:filePath
})
  
});



router.post('/add',Bodyparser.json(), function(req, res, next) {
  let name=req.body.name;
  Product.find({name:name}).exec().then(result=>
  {
    if (result.length>0){
      return res.status(404).json({
        message:'this product name is already existe'
        ,status:404
      });
    }else {
      
      const product=new Product({
        _id:mongoose.Types.ObjectId(),
        name:name,
        description:req.body.description,
        status:1,
        quantity:req.body.quantity,
        quantity_sold:0
        ,storeID:req.body.storeID
        ,categorieID:req.body.categorieID
        ,supplierID:req.body.supplierID
        
      });
      
        for(let item of req.body.prices){ 
        product.prices.push(item);
      }
    
      for(let item of req.body.images){ 
        product.images.push(item);
      }
      product.save().then(result=>{
    
        res.status(201).json(
            {
              message:'product created with successfully',
              status:201,
              product:result,
             
            }
        )
      }).catch(err=>{
        res.status(500).json({
          err:err,
          status:500
        });
      }) ;

   
    }

  });


});
//get product byid
router.get('/:productID', function(req, res, next) {
  let productID=req.params.productID;
console.log(productID);
   
  
  Product.find({_id:productID}).exec().then(products=>
  {
    
      
      
           res.status(200).json(
               {
            
                 status:200,
                 products:products,
                 size:products.length
               }
           )
         

    }  );

    
  

});
///get all products in store
router.get('/bystore/:storeID', function(req, res, next) {
  let storeID=req.params.storeID;
console.log(storeID);
   
  
  Product.find({storeID:storeID}).exec().then(products=>
  {
    
      
      
           res.status(200).json(
               {
            
                 status:200,
                 products:products,
                 size:products.length
               }
           )
         

    }  );

    
  

});
///get all products in store and gategorieID
router.get('/bystoreAndcategorie/:storeID/:categorieID', function(req, res, next) {
  let storeID=req.params.storeID;
console.log(storeID);

let categorieID=req.params.categorieID;
console.log(categorieID);
   
  
  Product.find({storeID:storeID ,categorieID:categorieID}).exec().then(products=>
  {
    
      
      
           res.status(200).json(
               {
            
                 status:200,
                 products:products,
                 size:products.length
               }
           )
         

    }  );

    
  

});

///get all products with this supplier

router.get('/bysupplier/:supplierID', function(req, res, next) {
  let supplierID=req.params.supplierID;
console.log(supplierID);
   
  
  Product.find({supplierID:supplierID}).exec().then(products=>
  {
    
      
      
           res.status(200).json(
               {
            
                 status:200,
                 products:products,
                 size:products.length
               }
           )
         

    }  );

    
  

});
///get all products with this supplier and gategorieID
router.get('/bysupplierAndcategorie/:supplierID/:categorieID', function(req, res, next) {
  let supplierID=req.params.supplierID;
console.log(supplierID);

let categorieID=req.params.categorieID;
console.log(categorieID);
   
  
  Product.find({supplierID:supplierID ,categorieID:categorieID}).exec().then(products=>
  {
    
      
      
           res.status(200).json(
               {
            
                 status:200,
                 products:products,
                 size:products.length
               }
           )
         

    }  );

    
  

});

///delete products byid
router.delete('/:productID', function(req, res, next) {
  let productID=req.params.productID;
console.log(productID);
   
  
  Product.findOneAndDelete({_id:productID},function(err)
  {
    
      
     if(err){
      res.status(404).json(
        {
     
          status:404,
          message:err,
         
        }
    )
     }else{
      res.status(200).json(
        {
     
          status:200,
          message:"delete with succ"
        }
    )
     }
           
         

    }  );

    
  

});




///update products byid
router.put('/:productID', function(req, res, next) {
  let productID=req.params.productID;
console.log(productID);
   
Product.findOneAndUpdate({_id:productID}, req.body, function (err, product) {
  

  if(err){
    res.status(404).json(
      {
   
        status:404,
        message:err,
       
      }
  )
   }
   else{
    res.status(200).json(
      {
   
        status:200,
        message:"update with succ"
        
      }
  )
   }

});
  
  

    
  

});
module.exports = router;
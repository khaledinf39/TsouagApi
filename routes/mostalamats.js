var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Mostalamat=require('../model/mostalamat');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const auth=require('../medelWare/auth_verfy');
var Product=require('../model/product');
var Supplier=require('../model/supplier');
var Store=require('../model/store');
var Electronique_bayments=require('../model/electronique_bayments');


function  getProducts(doc){
  return doc;
//   var products=new Array();
//   for(item of doc){
           
           
           
//     for(pro of item.products){
//       console.log(pro);
//       products.push(
//         {
//           _id:item._id,  
//         name:pro.name
//         ,quantity:pro.quantity
//       ,price:pro.price
//     ,create_at:item.create_at
//     ,status:item.status
        
//   })
//  }



//   }
// return products;
}
/* GET users listing. */
router.get('/:status/:page',auth, function(req, res, next) {
  
  var perPage = 10
  var page = req.params.page || 1
  Mostalamat.find({status:req.params.status})
  .sort({create_at:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
        .exec()
        .then(doc=>{
          
          console.log(doc);
          if (doc){
            var products= new Array();
            products=getProducts(doc);
            Mostalamat.find({status:req.params.status}).count().exec(function(err, count) {
              if (err) return next(err)
              res.status(200).json({
                status:200,
                message:'get order ',
                orders:products,
                Pagination:{
                  current: page,
                      pages: Math.ceil(count / perPage)
                      ,size:products.length
                }
    
              })
            });
             
          }else {
            res.status(404).json({
              status:404,
              message:'no data found for this id',
            })
          }
        
        })
     
        .catch(err=>{
          console.log(err);
          res.status(500).json({ status:500,err:err});
        });
      
  });

  /* GET users listing. */
router.get('/bystore/:storeID/:status/:page',auth, function(req, res, next) {
  
  var perPage = 10
  var page = req.params.page || 1
  Mostalamat.find({storeID:req.params.storeID ,status:req.params.status})
  .sort({create_at:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
        .exec()
        .then(doc=>{
          
          console.log(doc);
          if (doc){
            var products= new Array();
            products=getProducts(doc);
            Mostalamat.find({status:req.params.status}).count().exec(function(err, count) {
              if (err) return next(err)
              res.status(200).json({
                status:200,
                message:'get order ',
                orders:products,
                Pagination:{
                  current: page,
                      pages: Math.ceil(count / perPage)
                      ,size:products.length
                }
    
              })
            });
             
          }else {
            res.status(404).json({
              status:404,
              message:'no data found for this id',
            })
          }
        
        })
     
        .catch(err=>{
          console.log(err);
          res.status(500).json({ status:500,err:err});
        });
      
  });
  //order by id 
  router.get('/:orderid/:page',auth, function(req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    const id=req.params.orderid;
    Mostalamat.findById(id)
    .sort({create_at:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
         .exec()
        .then(doc=>{
          console.log(doc);
         if (doc){
          var products= new Array();
          products=getProducts(doc);
          Mostalamat.findById(id).count().exec(function(err, count) {
            if (err) return next(err)
            res.status(200).json({
              status:200,
              message:'get order ',
              orders:products,
              Pagination:{
                current: page,
                    pages: Math.ceil(count / perPage)
                    ,size:doc.length
              }
  
            })
          });
           
         }else {
           res.status(404).json({
             message:'no data found for this id',
           })
         }
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({err:err});
        });
  
  }); 
  //order by userId and status nb 
  router.get('/by_user_And_status/:userid/:status/:page',auth, function(req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    let id=req.params.userid;
    let status=req.params.status;
    Mostalamat.find({userID:id ,  status:status})
    .sort({create_at:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
         .exec()
        .then(doc=>{
          console.log(doc);
         if (doc){
          var products= new Array();
          products=getProducts(doc);
          Mostalamat.find({userID:id ,  status:status}).count().exec(function(err, count) {
            if (err) return next(err)
            res.status(200).json({
              status:200,
              message:'get order ',
              orders:products,
              Pagination:{
                current: page,
                    pages: Math.ceil(count / perPage)
                    ,size:doc.length
              }
  
            })
          });
         }else {
           res.status(404).json({
             message:'no data found for this id',
           })
         }
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({err:err});
        });
  
  });
   //order by storeId and status nb 
   router.get('/by_store_And_status/:storeId/:status/:page',auth, function(req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    let id=req.params.storeId;
    let status=req.params.status;
    Mostalamat.find({storeID:id ,  status:status})
    .sort({create_at:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
         .exec()
        .then(doc=>{
          console.log(doc);
         if (doc){
          var products= new Array();
          products=getProducts(doc);
          Mostalamat.find({storeID:id ,  status:status}).count().exec(function(err, count) {
            if (err) return next(err)
            res.status(200).json({
              status:200,
              message:'get order ',
              orders:products,
              Pagination:{
                current: page,
                    pages: Math.ceil(count / perPage)
                    ,size:doc.length
              }
  
            })
          });

         }else {
           res.status(404).json({
             message:'no data found for this id',
           })
         }
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({err:err});
        });
  
  });

  //post new order
  router.post('/',auth, function(req, res, next) {

  
/***************************************************************** */
    var products=req.body.products;
    for(let item of products){
        Product.findById(item._id).exec().then(
            product => {
                if (!product) {
                    return res.status(500).json({
                        status: 500,
                        message: 'product not found '+item._id+" "+item.name
                    });
                }

    
    
               
            });
    }
    Supplier.findById(req.body.userID).exec().then(
      user => {
        if (!user) {
          Store.findById(req.body.userID).exec().then(
            store=>{
              if(!store){
                return res.status(500).json({
                  status: 500,
                  message: 'user not found '+req.body.userID });
              }
            });
          }
             
        });   
          
          
                const order_supplier = new Mostalamat({
                  _id: new mongoose.Types.ObjectId(),
                  bayment_type: req.body.bayment_type,/// 1===cash 2==visacard
                  sub_total: req.body.sub_total,
                  QRcode: new Date().getTime(),
                  userID: req.body.userID,
                  storeID: req.body.storeID,
                  status:1,
                  user_name:req.body.user_name,
                  user_address:req.body.user_address,
                  user_phone:req.body.user_phone
              });
        
              for(let item of products){
                order_supplier.products.push(item);
              }
              order_supplier.save().then(result => {
                  console.log(result);
                  
                       
                  res.status(200).json({
                      status: 200,
                      message: 'Mostatlamat created with successefully',
                      order:[result] 
                  })
              });
        
              
            
          
         
      
     


     
  


  
}); 

//update order
  router.put('/:orderid/:status',auth, function(req, res, next) {
    let id=req.params.orderid;
    let status=req.params.status;
    
    Mostalamat.update(
      {_id: id}
    ,{$set:{status:status}}
    ,{new: true },
    function(err, response) {
   if (err) {
   callback(err);
  }
})
        .exec()
        .then(result=>{
          console.log(result);
          if (result){
           add_scour(id,status);
           
           res.status(200).json({
            status:200,
            message:' order updated',
            result:result
            })
           
          }else {
            res.status(404).json({
              message:'no data found for this id',
            })
          }
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({err:err});
        });
  
  });
  
  function add_scour(id,status){
if(status==2){

  Mostalamat.findOne({_id: id}).exec().then(result1=>{
    if(result1){
      console.log(result1);
    
    /*******************************************************update scour of supplier */
let supplierID=result1.userID;
let total=0;

total=+result1.sub_total;
  /*************************************update product quantity */
      var products=result1.products;
      for(let item of products){
                  
        Product.findOneAndUpdate(
            { _id: item._id },
             { $inc: {quantity: +item.quantity } }, 
             {new: true },
             function(err, response) {
            if (err) {
            callback(err);
           }
        }
         );
    }


console.log("total   :"+total);
console.log("status  :"+status);
Supplier.findOneAndUpdate(
  { _id: supplierID },
   { $inc: {scour: +total } }, 
   {new: true },
   function(err, response) {
  if (err) {
  callback(err);
 }
}
);

    }
  })
}

   
  }
  //delete order
  router.delete('/:orderid',auth, function(req, res, next) {
    const id=req.params.orderid;
    Mostalamat.remove({_id: id})
        .exec()
        .then(result=>{
          console.log(result);
          if (result){
            res.status(200).json({
              message:'order removed ',
              result:result
            })
          }else {
            res.status(404).json({
              status:200,
              message:'no data found for this id',
            })
          }
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({err:err});
        });
  
  });


module.exports = router;
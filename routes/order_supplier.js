var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Order=require('../model/order');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const auth=require('../medelWare/auth_verfy');
var Product=require('../model/product');
var User=require('../model/user');
var Store=require('../model/store');
var Electronique_bayments=require('../model/electronique_bayments');



/* GET users listing. */
router.get('/:status',auth, function(req, res, next) {
    Order.find({status:req.params.status})
        .limit(10)
        .exec()
        .then(doc=>{
          console.log(doc);
          if (doc){
            res.status(200).json({
              status:200,
              message:'get order ',
              orders:doc,
              size:doc.length
  
            })
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
  router.get('/:orderid',auth, function(req, res, next) {
    const id=req.params.orderid;
    Order.findById(id)
         .exec()
        .then(doc=>{
          console.log(doc);
         if (doc){
  
           res.status(200).json({
             status:200,
             message:'get order details',
             order:doc
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
  //order by userId and status nb 
  router.get('/by_user_And_status/:userid/:status',auth, function(req, res, next) {
    let id=req.params.userid;
    let status=req.params.status;
    Order.find({userID:id ,  status:status})
         .exec()
        .then(doc=>{
          console.log(doc);
         if (doc){
  
           res.status(200).json({
             status:200,
             message:'get order details',
             order:doc
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
   //order by storeId and status nb 
   router.get('/by_store_And_status/:storeId/:status',auth, function(req, res, next) {
    let id=req.params.storeId;
    let status=req.params.status;
    Order.find({storeID:id ,  status:status})
         .exec()
        .then(doc=>{
          console.log(doc);
         if (doc){
  
           res.status(200).json({
             status:200,
             message:'get order details',
             order:doc
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

  //post new order
  router.post('/',auth, function(req, res, next) {
     
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

                if(product.quantity-item.quantity<=0){
                    return res.status(500).json({
                        status: 500,
                        message: 'the quantity of this product is not enght '+item._id+" "+item.name
                    }); 
                }
    
    
               
            });
    }
    User.findById(req.body.userID).exec().then(
      user => {
        if (!user) {
          Store.findById(req.body.userID).exec().then(
            store=>{
              if(!store){
                return res.status(500).json({
                  status: 500,
                  message: 'user not found '+req.body.userID });
              }
              else{
                const order_supplier = new Order({
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
                  for(let item of products){
                  
                                  Product.findOneAndUpdate(
                                      { _id: item._id },
                                       { $inc: {quantity: -item.quantity } }, 
                                       {new: true },
                                       function(err, response) {
                                      if (err) {
                                      callback(err);
                                     }
                                  }
                                   );
                              }
              
                  if(req.body.bayment_type===2){
                   const electronique_bayments=new Electronique_bayments({
                    _id: new mongoose.Types.ObjectId(),
                
                    orderID:result._id,
                    price:req.body.sub_total
                    ,storeID:req.body.storeID
                   })
              
                   electronique_bayments.save().then(result => {
                    if (!result) {
                     return res.status(404).json({
                        status: 404,
                        message: 'error in adding electronique_bayments',
                        result: result
                    })
                   }
                 
                });
                  }            
                  res.status(200).json({
                      status: 200,
                      message: 'order created with successefully',
                      order:[result] 
                  })
              });
        
              }
            });
          
         
      }
     


      });
  


  
}); 

//update order
  router.put('/:orderid/:status',auth, function(req, res, next) {
    let id=req.params.orderid;
    let status=req.params.status;
    // const upadteops={};
    // for (const ops of req.body){
    //   upadteops[ops.propertyName]=ops.value;
    // }
    Order.update(
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
  
  //delete order
  router.delete('/:orderid',auth, function(req, res, next) {
    const id=req.params.orderid;
    Order.remove({_id: id})
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
var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Order=require('../model/order');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const auth=require('../medelWare/auth_verfy');
var Product=require('../model/product');

/* GET users listing. */
router.get('/',auth, function(req, res, next) {
    Order.find()
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
  router.get('/:orderid', function(req, res, next) {
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
  router.get('/:userid/:status', function(req, res, next) {
    let id=req.params.orderid;
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
   router.get('/:storeId/:status', function(req, res, next) {
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
  router.post('/',auth, function(req, res, next) {
     
    var products=req.body.products;
    for(let item of products){
        Product.findById(item._id).exec().then(
            product => {
                if (!product) {
                    return res.status(500).json({
                        status: 500,
                        message: 'product not found'
                    });
                }

                if(product.quantity-item.quantity<=0){
                    return res.status(500).json({
                        status: 500,
                        message: 'the quantity of this product is not enght '
                    }); 
                }
    
    
               
            });
    }
  
  const order_supplier = new Order({
    _id: new mongoose.Types.ObjectId(),
    bayment_type: req.body.bayment_type,
    sub_total: req.body.sub_total,
    QRcode: req.body.QRcode,
    userID: req.body.userID,
    storeID: req.body.storeID,
    status:1
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
    res.status(200).json({
        status: 200,
        message: 'order created with successefully',
        result: result
    })
});
  
}); 
  router.put('/:orderid/:status', function(req, res, next) {
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
  
  
  router.delete('/:orderid', function(req, res, next) {
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
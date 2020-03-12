var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Store=require('../model/store');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
var Expenses=require('../model/expenses');
var Box=require('../model/box');
var Term=require('../model/term_supplier');
const auth=require('../medelWare/auth_verfy');

/* GET users listing. */

const JWT_word="khaled";

router.post('/logup',Bodyparser.json(), function(req, res, next) {
  const phone=req.body.phone;
  console.log(phone);
  Store.find({phone:phone}).exec().then(result=>
  {
    if (result.length>0){
      return res.status(404).json({
        message:'this phone number is already existe'
        ,status:404
      });
    }else {
      const pw=req.body.password;
      const store=new Store({
        _id:mongoose.Types.ObjectId(),
        // email:req.body.email,
        password:pw,
        phone:req.body.phone,
        status:true,
        lat:req.body.lat,
        lng:req.body.lng,
        FCMtoken:req.body.FCMtoken
        ,email:req.body.email
      });
      store.save().then(result=>{
        const token=jwt.sign({
            phone:req.body.phone,
            password:req.body.password
            
          },JWT_word,null
         //  {
         //    expiresIn: "1000h"
         //  }
          );
        res.status(201).json(
            {
              message:'store created with successfully',
              status:201,
              store:result,
              token:token
            }
        )
      }).catch(err=>{
        res.status(500).json({
          err:err,
          status:500
        });
      }) ;

    //   bcrypt.hash(pw,10,function(err,hash){
    //     console.log(err);
    //     console.log(hash);
    //     if (err){

    //       return  res.status(500).json({

    //         err:err,
    //         status:5002
    //       });
    //     }else {
    //       const user=new User({
    //         _id:mongoose.Types.ObjectId(),
    //         email:req.body.email,
    //         password:hash
    //       });
    //       user.save().then(result=>{
    //         res.status(201).json(
    //             {
    //               message:'user created with successfully',
    //               status:201,
    //               result:result
    //             }
    //         )
    //       }).catch(err=>{
    //         res.status(500).json({
    //           err:err,
    //           status:500
    //         });
    //       }) ;

    //     }
    //   });
    }

  });


});


router.post('/login',Bodyparser.json(), function(req, res, next) {
   
    try{

      let token=jwt.sign({
        phone:req.body.phone,
        password:req.body.password
        
      },JWT_word,null
     
      );
        let phone=req.query.phone;
  console.log(phone);
  Store.find({phone:phone}).exec().then(stores=>
  {
    if (stores.length<1){
      return res.status(401).json({
        message:'auth faild this phone number is not existe'
        ,status:404
      });
    }else {
      const pw=req.query.password;
      const  storePw=stores[0].password;

      
      const store=stores[0];
      
       if(storePw===pw){
           res.status(200).json(
               {
                 message:'auth successful',
                 status:200,
                 store:store,
                 token:token
               }
           )
         }else
           {
             res.status(401).json({
               message:'auth faild this password is wrong'
               ,status:404
             });
         }
    //   bcrypt.compare(pw,hash,function(err,result){

    //     if (err){

    //       return  res.status(500).json({

    //         err:err,
    //         status:500
    //       });
    //     }else {
    //       const user=users[0];
    //    const token=jwt.sign({
    //         email:user.email,
    //         userId:user._id
    //       },"khaled",{
    //         expiresIn: "1h"
    //       });
    //     if(result){
    //         res.status(200).json(
    //             {
    //               message:'auth successful',
    //               status:200,
    //               user:user,
    //               token:token
    //             }
    //         )
    //       }else
    //         {
    //           res.status(401).json({
    //             message:'auth faild this password is wrong'
    //             ,status:404
    //           });
    //       }

    //     }
    //   });
    }

  });

    }catch(err){
        console.log(err)
        res.status(404).json({
            message:'auth faild this Token is not existe'
            ,status:404
           
          });
    }
  

});
///add to box
router.post('/addTObox',auth, function(req, res, next) {
  console.log(req.query)
const box=new Box({
   _id:mongoose.Types.ObjectId(),
  
  price:req.query.price
  ,storeID:req.query.storeID

})  
box.save().then(result=>{
  res.status(200).json({
    status:200,
    message:'add to box with succesfull',
    result:result
  })
})
  


});
///add to expensses
router.post('/addTOexpenses',auth, function(req, res, next) {
  console.log(req.query)
const expenses=new Expenses({
   _id:mongoose.Types.ObjectId(),
   desc:req.query.description,
  price:req.query.price
  ,storeID:req.query.storeID

})  
expenses.save().then(result=>{
  res.status(200).json({
    status:200,
    message:'add to expenses with succesfull',
    result:result
  })
})
  


});

//get box by store 
router.get('/box/:storeID',auth, function(req, res, next) {
  
  Box.find({storeID:req.params.storeID}).exec().then(result=>{
    if(!result){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"get all box by store ",
        boxes:result
      
      })
    
    }
  })


});
//get expenses by store 
router.get('/expenses/:storeID',auth, function(req, res, next) {
  
  Expenses.find({storeID:req.params.storeID}).exec().then(result=>{
    if(!result){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"get all expenses by store ",
        result:result
      
      })
    
    }
  })


});
//get all store 
router.get('/',auth, function(req, res, next) {
  
  Store.find().exec().then(stores=>{
    if(!stores){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"get all store ",
        stores:stores
      
      })
    
    }
  })


});
//get  store profile
router.get('/:id',auth, function(req, res, next) {
  
  Store.find({_id:req.params.id}).exec().then(stores=>{
    if(!stores){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"get store profile",
        stores:stores
      
      })
    
    }
  })


});
//update store info
router.put('/:id',auth,Bodyparser.json(), function(req, res, next) {
  
  Store.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function(err){
    if(err){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"update store with succesfully",
      
      })
    
    }
  })


});
///update stores's status byid
router.put('/:storeID/:statusNB',auth, function(req, res, next) {
  let storeID=req.params.storeID;
  let status=req.params.statusNB;

   
Store.findOneAndUpdate({_id:storeID}, {$set:{status:status}},{new:true}, function (err, product) {
  

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
        message:"update status with succ"
        
      }
  )
   }

});
  
  

    
  

});
//delete store info
router.delete('/:id',auth, function(req, res, next) {
  
  Store.findByIdAndRemove({_id:req.params.id},function(err){
    if(err){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"delete store with succesfully",
      
      })
    
    }
  })


});
module.exports = router;

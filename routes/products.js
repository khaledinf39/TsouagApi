var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Product=require('../model/product');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
/* GET users listing. */

const JWT_word="khaled";

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
        
      });
      
        for(let item of req.body.prices){ 
        product.prices.push(item);
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


router.get('/',Bodyparser.json(), function(req, res, next) {
  
    try{
      let token=jwt.sign(
        {
        phone:req.body.phone
      ,password:req.body.phone
    },JWT_word,null);

      console.log(token);

        let phone=req.body.phone;
  console.log(phone);
  
  User.find({phone:phone}).exec().then(users=>
  {
    if (users.length<1){
      return res.status(401).json({
        message:'auth faild this phone number is not existe'
        ,status:404
      });
    }else {
      const pw=req.body.password;
      const  userPw=users[0].password;

      
      const user=users[0];
      var timestamp = user._id.getTimestamp();
       if(userPw===pw){
           res.status(200).json(
               {
                 message:'auth successful',
                 status:200,
                 user:user,
                 token:token
                 ,create_at:timestamp
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


module.exports = router;
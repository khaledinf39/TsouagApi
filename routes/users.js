var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var User=require('../model/user');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
/* GET users listing. */

const JWT_word="khaled";

router.post('/logup',Bodyparser.json(), function(req, res, next) {
  const phone=req.body.phone;
  console.log(phone);
  User.find({phone:phone}).exec().then(result=>
  {
    if (result.length>0){
      return res.status(404).json({
        message:'this phone number is already existe'
        ,status:404
      });
    }else {
      const pw=req.body.password;
      const user=new User({
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
      user.save().then(result=>{
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
              message:'user created with successfully',
              status:201,
              user:result,
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
    let token=req.body.token;
    console.log(token);
    try{

jwt.verify(token,JWT_word);
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
      
       if(userPw===pw){
           res.status(200).json(
               {
                 message:'auth successful',
                 status:200,
                 user:user,
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


module.exports = router;

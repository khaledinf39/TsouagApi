var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var User=require('../model/user');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const auth=require('../medelWare/auth_verfy');
var Store=require('../model/store');

/* GET users listing. */

const JWT_word="khaled";

router.post('/logup',Bodyparser.json(), function(req, res, next) {
try{
  Store.find({_id:req.body.storeID},function(err){
    if(err){
      return res.status(500).json({
        status:500,
        message:err,
      
      })
    }
  }).exec().then(stores=>{
    if(stores.length<1){
     return res.status(500).json({
        status:500,
        message:'this store id is not exist in db',
      
      })
    
    
    }
  })
}catch(err){
  return res.status(500).json({
    status:500,
    message:err,
  
  })
}
 
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
        ,storeID:req.body.storeID
        
      });
      user.save().then(result=>{
        let token=jwt.sign({
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
  
    try{
      let token=jwt.sign(
        {
        phone:req.query.phone
      ,password:req.query.phone
    },JWT_word,null);

      console.log(token);

        let phone=req.query.phone;
  console.log(phone);
  
  User.find({phone:phone}).exec().then(users=>
  {
    if (users.length<1){
      return res.status(401).json({
        message:'auth faild this phone number is not existe'
        ,status:404
      });
    }else {
      const pw=req.query.password;
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

//get all users 
router.get('/',auth, function(req, res, next) {
  
  User.find().exec().then(users=>{
    if(!users){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"get  all user ",
        users:users
      
      })
    
    }
  })


});
//get all users by store 
router.get('/bystore/:storeid',auth, function(req, res, next) {
  
  User.find({storeID:req.params.storeid}).exec().then(users=>{
    if(!users){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"get user profile",
        users:users
      
      })
    
    }
  })


});
//get  user profile
router.get('/:id',auth, function(req, res, next) {
  
  User.find({_id:req.params.id}).exec().then(user=>{
    if(!user){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"get user profile",
        users:user
      
      })
    
    }
  })


});
//update user info
router.put('/:id',auth,Bodyparser.json(), function(req, res, next) {
  
  User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},function(err){
    if(err){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"update user with succesfully",
      
      })
    
    }
  })


});
///update users's status byid
router.put('/:userID/:statusNB',auth, function(req, res, next) {
  let userID=req.params.userID;
  let status=req.params.statusNB;

   
User.findOneAndUpdate({_id:userID}, {$set:{status:status}},{new:true}, function (err, product) {
  

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
//delete user info
router.delete('/:id',auth, function(req, res, next) {
  
  User.findByIdAndRemove({_id:req.params.id},function(err){
    if(err){
      res.status(500).json({
        status:500,
        message:err,
      
      })
    }else{
      res.status(200).json({
        status:200,
        message:"delete user with succesfully",
      
      })
    
    }
  })


});
module.exports = router;

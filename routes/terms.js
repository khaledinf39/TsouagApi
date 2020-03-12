
var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
var Term_supplier=require('../model/term_supplier');
var Term_client=require('../model/term_client');
const auth=require('../medelWare/auth_verfy');
//get term by store 
router.get('/term_supplier/:storeID',auth, function(req, res, next) {
  
    Term_supplier.find({storeID:req.params.storeID}).exec().then(result=>{
      if(!result){
        res.status(500).json({
          status:500,
          message:err,
        
        })
      }else{
        res.status(200).json({
          status:200,
          message:"get all term by store ",
          result:result
        
        })
      
      }
    })
  
  
  });
///add to Term
router.post('/addTerm_condition_supplier',auth, function(req, res, next) {
    console.log(req.query)
  const tirm=new Term_supplier({
     _id:mongoose.Types.ObjectId(),
    
    titel:req.query.titel
    ,body:req.query.body
    ,storeID:req.query.storeID
  
  })  
  tirm.save().then(result=>{
    res.status(200).json({
      status:200,
      message:'add to Term_condition with succesfull',
      result:result
    })
  })
    
  
  
  });
  //// update term_condition by store
  router.put('/term_condition_supplier/:id',auth, function(req, res, next) {
      
     
  
    Term_supplier.findByIdAndUpdate({_id:req.params.id},req.query,{new:true}).exec().then(result=>{
        if(result){
            res.status(200).json({
                status:200,
                message:"update term_condition with succesfully",
                term_condition:result
            })
        }else{
            res.status(500).json({
                status:500,
                message:"error to update",
                term_condition:result
            })
        }
    })
  });
  
   //// delete Term by store
   router.delete('/term_condition_supplier/:id',auth,Bodyparser.json(), function(req, res, next) {
    Term_supplier.findByIdAndRemove({_id:req.params.id},function(err){
        if(err){
          res.status(500).json({
            status:500,
            message:err,
          
          })
        }else{
          res.status(200).json({
            status:200,
            message:"delete term_condition with succesfully",
          
          })
        
        }
      })
  });


/******************************////fore clients**********************************************************/

//get term by store 
router.get('/term_client/:storeID',auth, function(req, res, next) {
  
    Term_client.find({storeID:req.params.storeID}).exec().then(result=>{
      if(!result){
        res.status(500).json({
          status:500,
          message:err,
        
        })
      }else{
        res.status(200).json({
          status:200,
          message:"get all term by store ",
          result:result
        
        })
      
      }
    })
  
  
  });
  router.post('/addTerm_condition_client',auth, function(req, res, next) {
    console.log(req.query)
  const tirm=new Term_client({
     _id:mongoose.Types.ObjectId(),
    
    titel:req.query.titel
    ,body:req.query.body
    ,storeID:req.query.storeID
  
  })  
  tirm.save().then(result=>{
    res.status(200).json({
      status:200,
      message:'add to Term_condition with succesfull',
      result:result
    })
  })
    
  
  
  });
  //// update term_condition by store
  router.put('/term_condition_client/:id',auth, function(req, res, next) {
      
     
  
    Term_client.findByIdAndUpdate({_id:req.params.id},req.query,{new:true}).exec().then(result=>{
        if(result){
            res.status(200).json({
                status:200,
                message:"update term_condition with succesfully",
                term_condition:result
            })
        }else{
            res.status(500).json({
                status:500,
                message:"error to update",
                term_condition:result
            })
        }
    })
  });
  
   //// delete Term by store
   router.delete('/term_condition_client/:id',auth,Bodyparser.json(), function(req, res, next) {
    Term_client.findByIdAndRemove({_id:req.params.id},function(err){
        if(err){
          res.status(500).json({
            status:500,
            message:err,
          
          })
        }else{
          res.status(200).json({
            status:200,
            message:"delete term_condition with succesfully",
          
          })
        
        }
      })
  });
  module.exports = router;
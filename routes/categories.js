var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Categorie=require('../model/categorie');
const mongoose=require('mongoose');

const auth=require('../medelWare/auth_verfy');



/* GET users listing. */
router.get('/',auth, function(req, res, next) {
    Categorie.find()
        .limit(10)
        .exec()
        .then(doc=>{
          console.log(doc);
          if (doc){
            res.status(200).json({
              status:200,
              message:'get all Categorie ',
              categories:doc,
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

//// get categories by store
  router.get('/:storeID',auth, function(req, res, next) {
    Categorie.find({storeID:req.params.storeID})
        .limit(10)
        .exec()
        .then(doc=>{
          console.log(doc);
          if (doc){
            res.status(200).json({
              status:200,
              message:'get all Categorie ',
              categories:doc,
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

  //// Add categories by store
  router.post('/',auth, function(req, res, next) {
    
    const categorie=new Categorie({
        _id:mongoose.Types.ObjectId(),
    name:req.query.name
        ,storeID:req.query.storeID
    })

    categorie.save().then(result=>{
        if(result){
            res.status(200).json({
                status:200,
                message:"add categorie with succesfully",
                categories:result
            })
        }else{
            res.status(500).json({
                status:500,
                message:"error to add",
                categorie:result
            })
        }
    })
  });


   //// update categories by store
   router.put('/:id',auth, function(req, res, next) {
    
   

    Categorie.findByIdAndUpdate({_id:req.params.id},req.query,{new:true}).exec().then(result=>{
        if(result){
            res.status(200).json({
                status:200,
                message:"update categorie with succesfully",
                categorie:result
            })
        }else{
            res.status(500).json({
                status:500,
                message:"error to add",
                categorie:result
            })
        }
    })
  });

   //// delete categories by store
   router.delete('/:id',auth,Bodyparser.json(), function(req, res, next) {
    Categorie.findByIdAndRemove({_id:req.params.id},function(err){
        if(err){
          res.status(500).json({
            status:500,
            message:err,
          
          })
        }else{
          res.status(200).json({
            status:200,
            message:"delete Categorie with succesfully",
          
          })
        
        }
      })
  });
  module.exports = router;
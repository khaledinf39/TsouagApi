var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Electronique_bayments=require('../model/electronique_bayments');
const mongoose=require('mongoose');

const auth=require('../medelWare/auth_verfy');



/* GET users listing. */
router.get('/:storeID/:page',auth, function(req, res, next) {
    let storeID=req.params.storeID;
    var perPage = 10
    var page = req.params.page || 1

    Electronique_bayments.find({storeID:storeID})
    .skip((perPage * page) - perPage)
    .limit(perPage)
        .exec()
        .then(doc=>{
          console.log(doc);
          if (doc){
            Electronique_bayments.find({storeID:storeID}).count().exec(function(err, count) {
                if (err) return next(err)
                res.status(200).json({
                  status:200,
                  message:'get elect payment ',
                  doc:doc,
                  Pagination:{
                    current: page,
                        pages: Math.ceil(count / perPage)
                        ,size:doc.length
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

  module.exports = router;
const auth=require('../medelWare/auth_verfy');
var express = require('express');
var router = express.Router();
const Bodyparser=require('body-parser');
var Product=require('../model/product');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const cloudinary=require('cloudinary').v2;

/**********************************************config */
cloudinary.config({
  cloud_name:'ddyboaekl'
  ,api_key:'822976377369499'
  ,api_secret:'okG43B7sVzS0zYxpNphGu_wtss0'
})

router.post('/', function(req, res, next) {
  const file=req.files.photo;
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath,function(err,result){
    res.status(201).json({
      result:result
      })
  })

})
///////for upload images///////////////////
const multer=require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, 
      // file.originalname)
       Date.now() + '-' +  file.originalname)
  }
});
var upload = multer({storage: storage});

///////////////////////////////////////////////////////////////////////
/* GET users listing. */

router.post('/upload',auth,upload.single('img'), function(req, res, next) {
    console.log(req.file);

    let host = req.host;
    let port=process.env.PORT || 8080;
    var filePath="";
if(host==="localhost"){
 filePath = req.protocol + "://" + host +':'+port+ '/uploads/' + req.file.filename;
}else{
 filePath = req.protocol + "://" + host + '/uploads/' + req.file.filename;

}

res.status(201).json({
  result:filePath
})
  
});
module.exports = router;
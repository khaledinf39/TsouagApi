const express=require('express')
const stores=require('./routes/stores')
const users=require('./routes/users')
const supplier=require('./routes/suppliers')
var mongoose=require('mongoose');

const app=express();



//connecting to DB

const DB_atlas="mongodb+srv://khaledinf:BQFjLj2WFDl53Bh0@cluster0-wf1ig.mongodb.net/khaledDB?retryWrites=true&w=majority";
mongoose.connect(DB_atlas,{ useNewUrlParser: true });

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});

//////////////////////// midillwear////////////////////
// app.use(express.static('public'));
// app.use('/stores',stores);
app.use('/users',users);
// app.use('/suppliers',supplier);



/////// calinng////////////
const Port=process.env.PORT || 8080;
app.listen(Port,()=> console.log('listinng to port 8080....!'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const error=new Error('Not found');
    error.status=404;
      next(error);
    });
    
    // error handler
    app.use(function(err, req, res, next) {
      res.status (err.status || 500);
      res.json({
        error:{
          message:err.message
        }
      });
    });
    
    module.exports = app;
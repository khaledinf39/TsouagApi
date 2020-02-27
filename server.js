const express=require('express')
const stores=require('./routes/stores')
const users=require('./routes/users')
const suppliers=require('./routes/suppliers')
const categories=require('./routes/categories')
const products=require('./routes/products')
const order_supplier=require('./routes/order_supplier')
var mongoose=require('mongoose');
var path = require('path');
const app=express();



//connecting to DB

const DB_atlas="mongodb+srv://khaledinf:BQFjLj2WFDl53Bh0@cluster0-wf1ig.mongodb.net/TsouagDB?retryWrites=true&w=majority";
mongoose.connect(DB_atlas,{ useNewUrlParser: true ,useUnifiedTopology: true });

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyparser.urlencoded({extended: false}));
// app.use(bodyparser.json());
//////////////////////// midillwear////////////////////
// app.use(express.static(__dirname, 'public'));

app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));

app.use('/stores',stores);
app.use('/users',users);
app.use('/suppliers',suppliers);
app.use('/categories',categories);
app.use('/products',products);
app.use('/order',order_supplier);



/////// calinng////////////
// const Port=process.env.PORT || 8080;
// app.listen(Port,()=> console.log('listinng to port 8080....!'));


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
    
    app.listen(process.env.PORT || 8080, () => console.log("lisiinng..."))
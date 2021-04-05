const express=require('express');//import
const mongoose= require ('mongoose');
const app=express();// initialize
const path = require('path');
const cors = require('cors');

const customer= require('./model/customer');
const Product = require('./model/product');
const booking=require('./model/booking');
const OnlineServices=require('./model/OnlineServices');


const customerrouter=require('./Router/customerrouter');
const productrouter=require('./Router/productrouter');
const bookingrouter=require('./Router/bookingrouter');
const onlineservicesrouter=require('./Router/onlineservicesrouter');
const uploadRouter= require('./Router/uploadRouter');

const auth=require('./Router/auth');


//connection
mongoose.connect('mongodb://127.0.0.1/task',{
    useNewUrlParser:true,
   useUnifiedTopology:true,
   useFindAndModify:true,
   useCreateIndex:true
})
.then(() => console.log('Database server connected'))
.catch((err) => console.log(err));

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended : false}))

//callback 
app.get ('/' , (req , res,next) => {
    res.send('welcome, to my app');

});

app.use('/reserve',bookingrouter);
app.use('/upload',uploadRouter);
app.use('/good' ,auth.verifyUser,productrouter);
app.use('/service', onlineservicesrouter);
app.use('/user',customerrouter);// for login

//error handling
app.use((req,res,next)=> {
    let err= new  Error('Not found'); 
    err.status=404;
  next(err);
})
app.use((err,req,res,next)=> {
  console.log(err.stack);
  res.status(err.status || 500); //default error
  res.json({
      status:'error',
      message: err.message
  });
})


app.listen(3001, () => {
    console.log('Server is running at localhost:3001');
});
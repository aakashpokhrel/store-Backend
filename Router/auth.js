const jwt=require('jsonwebtoken');

function verifyUser(req,res,next){
  //console.log(authHeader);
let authHeader=req.headers.authorization;
    if(!authHeader){
        let err= new Error('No authentication information');
        err.status=401;
        return next(err);
    }
  let token=authHeader.split(" ")[1];
    jwt.verify(token,'SecretKey',
    (err,userId,role)=>{
        if(err){
            let err=new Error('Token could not be verified');
            return next(err);
        }

     req.user =userId;
     req.user=role;
     next();

  })

}
function verifyPerformer(req,res,next){
  if(!req.user){
    let err=new Error('No authentication information');
    err.status=401;
    return next(err);
  } else if(req.user.role=='basic'){
    let err=new Error('Forbidden!');
    err.status=403;
    return next(err);
clear
  }
next();
}

function verifyAdmin(req,res,next){
  console.log(req.user);
  if(!req.user){
    let err=new Error('No authentication information');
    err.status=401;
    return next(err);
  } else if(req.user.role !=='admin'){
    let err=new Error('Forbidden');
    err.status=403;
    return next(err);

  }
next();
}


module.exports= {
  verifyUser,
  verifyPerformer,
  verifyAdmin
}
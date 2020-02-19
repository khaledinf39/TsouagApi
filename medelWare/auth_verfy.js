
const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.token;
        console.log(token);
      const  decode=jwt.verify(token,"khaled") ;
      req.userData=decode;
      next();
    }catch (e) {
        return res.status(401).json({
          status:401,
          message:"token wrong"
        });

    }
}
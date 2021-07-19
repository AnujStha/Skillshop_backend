const JWT=require('jsonwebtoken');
const config = require('../Config/config');
const AdminModel = require('../Model/Users/admin.model');

module.exports=function(req,res,next){
    let token;
    //get token
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization']
    }
    if (req.headers['token']) {
        token = req.headers['token'];
    }
    if (req.query.token) {
        token = req.query.token;
    }
    if(token){
        JWT.verify(token,config.JsonWebTokenSecret,(err,payload)=>{
            if(err){
                return next({
                    msg:"error in decoding token",
                    status:400
                })
            }
            if(payload.userType="admin"){
                AdminModel.findOne({'user.userName':payload.userName,"_id":payload._id},(err,admin)=>{
                    if(err){
                        return next(err)
                    }
                    if(admin==null){
                        return next({
                            msg:"invalid token",
                            status:400
                        })
                    }
                    req.loggedInAdmin=admin
                    next()
                })
            }   
            else{
                return next({
                    msg:"invalid token"
                })
            }

        })
    }else{
        return next({
            msg:"token not found",
            status:400
        })
    }
}
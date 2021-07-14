const JWT=require('jsonwebtoken');
const config = require('../Config/config');
const ManpowerModel = require('../Model/Users/manpower.model');

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
            if(payload.userType="manpower"){
                ManpowerModel.findOne({'user.userName':payload.userName,'_id':payload._id},(err,manpower)=>{
                    if(err){
                        return next(err)
                    }
                    if(manpower==null){
                        return next({
                            msg:"invalid token",
                            status:400
                        })
                    }
                    req.loggedInManpower=manpower
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
const Admin=require('../Model/Users/admin.model');
const userModel = require('../Model/Users/user.model');
const Utility=require('../Utility/mapper.utility');
const Hash= require('../Utility/passwordHash.utility');
const JsonWebToken=require('jsonwebtoken');
const config = require('../Config/config');

async function admin_get(req,res,next){
    try{
        let admin = await(Admin.findOne({"user.userName":req.params.adminUserName}));
        if(admin!=null){
            res.status(200).json(admin)
        }else{
            return next({
                msg:"admin not found"+req.params.adminUserName,
                status:404
            })
        }
    }catch(e){
        return next(e)
    }
}

async function admin_put(req,res,next){
    try {
        let data=req.body;
        let userName=req.params.adminUserName;
        let admin=await(Admin.findOne({"user.userName":userName}))
        
        if(admin==null){
            return next({
                msg:"user not found"
            })
        }
        if(data.userName!=null){
            data.userName=null;//we cannot change userName. userName is unique and unchangable
        }
        if(data.password!=null){
            data.passwordHash=await(Hash.Hash(data.password))
        }

        admin=await(Utility.map_admin_request(admin,data))//map

        admin=await(admin.save());//save client

        if(admin==null){
            return next({
                msg:"error in updating client"
            })
        }

        res.status(200).json(admin);


    } catch (error) {
        return next(error)
    }
}

async function admin_post(req,res,next){
    try {
        let data=req.body;
        //todo check user name for unique

        //verify required data
        if(data.userName==null||data.userName==""){
            throw({
                msg:"invalid user name",
                status:400
            })
        }
        if(data.password==null){
            throw({
                msg:"password required",
                status:400
            })
        }else{
            data.passwordHash=await(Hash.Hash(data.password))
        }
        if(data.primaryContactNumber==null){
            throw({
                msg:"primary contact nmber required",
                status:400
            })
        }
        if(data.permanentAddress==null){
            throw({
                msg:"permanent address required",
                status:400
            })
        }

        let newAdmin=new Admin({});
        newCilent= await(Utility.map_admin_request(newAdmin,data))
        newAdmin= await(newAdmin.save())

        res.status(200).json(newAdmin)

    } catch (error) {
        return next(error)
    }
}


async function admin_delete(req,res,next){
    try {
        let deletedUser= await(Admin.findOneAndDelete({"user.userName":req.params.adminUserName}))
        if(deletedUser==null){
            return next({msg:"admin not found"})
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        return next(error);
    }
}

async function admin_login(req,res,next){
    try {
        let data=req.body;
        let admin=await(Admin.findOne({'user.userName':data.userName}))
        if(data.password==null){
            return next({
                msg:"password required",
                status:400
            })
        }
    
        if(admin==null){
            return next({
                msg:'user not found'
            })
        }
    
        let match=await(Hash.Match(data.password,admin.user.passwordHash))
        if(match){
            let payload={
                userName:admin.user.userName,
                userType:"client",
                _id:admin._id
            }
            JsonWebToken.sign(payload,config.JsonWebTokenSecret,function(err,token){
                if(err){
                    throw(err)
                }else{
                    res.status(200).json({
                        userName:admin.user.userName,
                        token:token
                    })
                }
            })
    
        }
    } catch (error) {
        return next(error)
    }
}



module.exports={
    admin_get,
    admin_put,
    admin_post,
    admin_delete,
    admin_login
}
const Manpower=require('../Model/Users/manpower.model')
const Mapper=require('../Utility/mapper.utility')
const Hash=require('../Utility/passwordHash.utility');
const JsonWebToken=require('jsonwebtoken')
const config=require('./../Config/config')

async function manpower_get(req,res,next){
    try{
        let manpower = await(Manpower.findById(req.params.id));
        if(manpower!=null){
            res.status(200).json(manpower)
        }else{
            return next({
                msg:"manpower not found",
                status:404
            })
        }
    }catch(e){
        return next(e)
    }
}

async function manpower_put(req,res,next){
    try {
        let data=req.body;
        let id=req.params.id;
        let manpower=await(Manpower.findById(id))
        if(manpower==null){
            return next({
                msg:"user not found"
            })
        }
        if(data.userName!=null){
            data.userName=null;//we cannot change userName. userName is unique and unchangable
        }
        await(Mapper.map_manpower_request(manpower,data))//map
        manpower=await(manpower.save());//save client

        if(manpower.password!=null){
            manpower.passwordHash=await(Hash.Hash(manpower.password))
        }

        if(manpower==null){
            return next({
                msg:"error in updating manpower"
            })
        }

        res.status(200).json(manpower);


    } catch (error) {
        return next(error)
    }
}

async function manpower_post(req,res,next){
    try {
        let data=req.body;
        //todo check user name for unique

       console.log(data)
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
            data.passwordHash=await(Hash.Hash(data.password))//hash password
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

        if(req.file){
            data.images=req.file.filename
        }

        let newManpower=new Manpower();
        newManpower= await(Mapper.map_manpower_request(newManpower,data))
        newManpower= await(newManpower.save())
        res.status(200).json(newManpower)

    } catch (error) {
        return next(error)
    }
}

async function manpower_delete(req,res,next){
    try {
        try {
            let deletedUser= await(Manpower.findOneAndDelete({"user.userName":req.params.manpowerUserName}))
            if(deletedUser==null){
                return next({msg:"manpower not found",})
            }
            res.status(200).json(deletedUser);
        } catch (error) {
            return next(error);
        }
    } catch (error) {
        return next(error)
    }
}

async function manpower_login(req,res,next){
    try {
        let data=req.body;
        let manpower=await(Manpower.findOne({'user.userName':data.userName}))
        if(data.password==null){
            return next({
                msg:"password required",
                status:400
            })
        }
    
        if(manpower==null){
            return next({
                msg:'user not found'
            })
        }
    
        let match=await(Hash.Match(data.password,manpower.user.passwordHash))
        if(match){
            let payload={
                userName:manpower.user.userName,
                userType:"manpower",
                _id:manpower._id
            }
            JsonWebToken.sign(payload,config.JsonWebTokenSecret,function(err,token){
                if(err){
                    throw(err)
                }else{
                    res.status(200).json({
                        userId:manpower._id,
                        userName:manpower.user.userName,
                        token:token
                    })
                }
            })
    
        }else{
            return next({
                msg:"password or user name doesn't match"
            })
        }
    } catch (error) {
        return next(error)
    }
}

module.exports={
    manpower_get,
    manpower_put,
    manpower_post,
    manpower_delete,
    manpower_login
}
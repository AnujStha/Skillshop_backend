const Client=require('../Model/Users/client.model');
const userModel = require('../Model/Users/user.model');
const Utility=require('../Utility/mapper.utility');
const Hash= require('../Utility/passwordHash.utility');
const JsonWebToken=require('jsonwebtoken');
const config = require('../Config/config');

async function client_get(req,res,next){
    try{
        let client = await(Client.findOne({"user.userName":req.params.clientUserName}));
        if(client!=null){
            res.status(200).json(client)
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

async function client_put(req,res,next){
    try {
        let data=req.body;
        let userName=req.params.clientUserName;
        let client=await(Client.findOne({"user.userName":userName}))
        
        if(client==null){
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

        client=await(Utility.map_client_request(client,data))//map

        client=await(client.save());//save client

        if(client==null){
            return next({
                msg:"error in updating client"
            })
        }

        res.status(200).json(client);


    } catch (error) {
        return next(error)
    }
}

async function client_post(req,res,next){
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

        let newClient=new Client({});
        newCilent= await(Utility.map_client_request(newClient,data))
        newClient= await(newClient.save())

        res.status(200).json(newClient)

    } catch (error) {
        return next(error)
    }
}


async function client_delete(req,res,next){
    try {
        console.log(req.params.clientUserName)
        let deletedUser= await(Client.findOneAndDelete({"user.userName":req.params.clientUserName}))
        if(deletedUser==null){
            return next({msg:"client not found"})
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        return next(error);
    }
}

async function client_login(req,res,next){
    try {
        let data=req.body;
        let client=await(Client.findOne({'user.userName':data.userName}))
        if(data.password==null){
            return next({
                msg:"password required",
                status:400
            })
        }
    
        if(client==null){
            return next({
                msg:'user not found'
            })
        }
    
        let match=await(Hash.Match(data.password,client.user.passwordHash))
        if(match){
            let payload={
                userName:client.user.userName,
                userType:"client",
                _id:client._id
            }
            console.log(payload)
            JsonWebToken.sign(payload,config.JsonWebTokenSecret,function(err,token){
                if(err){
                    throw(err)
                }else{
                    res.status(200).json({
                        userName:client.user.userName,
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
    client_get,
    client_put,
    client_post,
    client_delete,
    client_login
}
const Client=require('../Model/Users/client.model');
const userModel = require('../Model/Users/user.model');
const Utility=require('../Utility/mapper.utility')

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
    res.send("from put client")
}

async function client_post(req,res,next){
    try {
        let data=req.body;
        console.log("data:"+JSON.stringify(data))
        //todo check user name for unique

        if(data.userName==""||data.userName==null){
            return next({
                msg:"username not valid",
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
    res.send("from client login")
}



module.exports={
    client_get,
    client_put,
    client_post,
    client_delete,
    client_login
}
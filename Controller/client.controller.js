const Client=require('../Model/Users/client.model')
const Utility=require('../Utility/mapper.utility')

async function client_get(req,res,next){
    try{
        let client = await(Client.findOne(req.params));
        if(client!=null){
            res.status(200).json(client)
        }else{
            return next({
                msg:"user not found",
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

        // if(client!=null){
        //     //username already exists
        //     return next({
        //         msg:"username already exists",
        //         status:400
        //     })
        // }

        let newClient=new Client({});
        newClent= await(Utility.map_client_request(newClient,data))
        newClient= await(newClient.save())
        res.status(200).json(await(newClient.execPopulate('user')))

    } catch (error) {
        return next(error)
    }
}



async function client_delete(req,res,next){
    res.send("from delete client")
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
const Manpower=require('../Model/Users/manpower.model')
const Utility=require('../Utility/mapper.utility')

async function manpower_get(req,res,next){
    res.send("from get manpower")
}

async function manpower_put(req,res,next){
    res.send("from put manpower")
}

async function manpower_post(req,res,next){
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

        let newManpower=new Manpower({});
        newManpower= await(Utility.map_manpower_request(newManpower,data))
        newManpower= await(newManpower.save())

        //populate user and contents of user
        res.status(200).json(await(newManpower.execPopulate({
            path:"user",
            populate:[{
                path:"primaryContactNumber"
            },
            {
                path:"contactNumbers"
            },
            {
                path:"availableJobs"
            }]
        })))

    } catch (error) {
        return next(error)
    }
}

async function manpower_delete(req,res,next){
    res.send("from delete manpower")
}

async function manpower_login(req,res,next){
    res.send("from client login")
}

module.exports={
    manpower_get,
    manpower_put,
    manpower_post,
    manpower_delete,
    manpower_login
}
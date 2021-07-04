const Manpower=require('../Model/Users/manpower.model')

async function manpower_get(req,res,next){
    res.send("from get manpower")
}

async function manpower_put(req,res,next){
    res.send("from put manpower")
}

async function manpower_post(req,res,next){
    res.send("from post manpower")
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
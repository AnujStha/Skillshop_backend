const Client=require('../Model/Users/client.model')

async function client_get(req,res,next){
    res.send("from get client")
}

async function client_put(req,res,next){
    res.send("from put client")
}

async function client_post(req,res,next){
    res.send("from post client")
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
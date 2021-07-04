const service=require('../Model/Jobs/service.model')

async function service_get(req,res,next){
    res.send("from get service")
}

async function service_put(req,res,next){
    res.send("from put service")
}

async function service_post(req,res,next){
    res.send("from post service")
}

async function service_delete(req,res,next){
    res.send("from delete service")
}

module.exports={
    service_get,
    service_put,
    service_post,
    service_delete
}
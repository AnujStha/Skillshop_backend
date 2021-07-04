
async function job_get(req,res,next){
    res.send("from get jobs")
}

async function job_put(req,res,next){
    res.send("from put job")
}

async function job_post(req,res,next){
    res.send("from post job")
}

async function job_delete(req,res,next){
    res.send("from delete job")
}

module.exports={
    job_get,
    job_put,
    job_post,
    job_delete
}
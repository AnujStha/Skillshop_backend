const Job=require("./../Model/JobsAndServices/job.model")

async function job_get(req,res,next){
    try {
        let job=await(Job.findOne({jobName:req.params.jobName}))

        if(job==null){
            return next({
                msg:"job not found",
                status:400
            })
        }
    
        res.status(200).json(job)
    } catch (e) {
        return next(e)
    }
}

async function job_put(req,res,next){
    try {
        let data=req.body;
        if(data.jobName==null){
            data.jobName=req.params.jobName
        }
        //check if job name is valid
        if(data.jobName==null||""){
            return next({
                msg:"job name required",
                status:400
            })
        }

        //check if job already exists
        let job=await(Job.findOne({jobName:data.jobName}))
        if(job==null){
            return next({
                msg:"job not found",
                status:400
            })
        }
        
        if(data.jobCategory!=null){
            job.category=data.jobCategory;
        }

        if(data.tags!=null){
            if(Array.isArray(data.tags)){
                for (const tag of data.tags) {
                    job.tags.push(tag)
                }
            }
        }

        job=await(job.save())

        res.status(200).json(job)

    } catch (e) {
        return next(e)
    }
}

async function job_post(req,res,next){
    try {
        let data=req.body;

        //check if job name is valid
        if(data.jobName==null||""){
            return next({
                msg:"job name required",
                status:400
            })
        }

        //check if job already exists
        let existingJob=await(Job.findOne({jobName:data.jobName}))
        if(existingJob!=null){
            return next({
                msg:"job already exists",
                status:400
            })
        }

        let job=new Job({});

        job.jobName=data.jobName;
        
        if(data.jobCategory!=null){
            job.category=data.jobCategory;
        }

        if(data.tags!=null){
            if(Array.isArray(data.tags)){
                for (const tag of data.tags) {
                    job.tags.push(tag)
                }
            }
        }

        job=await(job.save())

        res.status(200).json(job)

    } catch (e) {
        return next(e)
    }
}

async function job_delete(req,res,next){
    try {
        let jobName=req.params.jobName;
        let job=await(Job.findOneAndDelete({jobName:jobName}))
    
        if(job==null){
            return next({
                msg:"job not found",
                status:400
            })
        }else{
            res.status(200).json(job)
        }           
    } catch (e) {
        return next(e)
    }
}

module.exports={
    job_get,
    job_put,
    job_post,
    job_delete
}
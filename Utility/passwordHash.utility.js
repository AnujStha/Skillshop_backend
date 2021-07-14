const Bcrypt=require('bcrypt')
const Config = require('../Config/config')

async function Hash(password){
    try{
        return await(Bcrypt.hash(password,Config.hashSaltRounds))
    }
    catch(e){
        throw e;
    }
}

async function Match(password,passwordHash){
    try {
        return await(Bcrypt.compare(password,passwordHash))
    } catch (e) {
        throw(e)
    }
}

module.exports={
    Hash,
    Match
}
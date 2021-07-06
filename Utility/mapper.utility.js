const User=require('../Model/Users/user.models')
const ContactNumber=require('../Model/Contacts/contactNumber.model')
const ContactEmail=require('../Model/Contacts/email.model');

async function map_client_request(client,data){
    try {
        let clientUser=new User({});
        let mappedClientUser=await(map_user_request(clientUser,data))
        console.log("user"+mappedClientUser)
        await(mappedClientUser.save())
        client.user=clientUser._id;
        return client
    } catch (error) {
        throw(error)
    }
}

async function map_user_request(user,data){
    try {
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
        }
        if(data.primaryContactNumber==null){
            throw({
                msg:"primary contact nmber required",
                status:400
            })
        }

        user.userName=data.userName;
        if(data.firstName!=null){
            user.firstName=data.firstName;
        }
        if(data.middleName!=null){
            user.middleName=data.middleName;
        }
        if(data.lastName!=null){
            user.lastName=data.lastName
        }
        user.password=data.password;//should be encrypted

        let primaryContactNumber=new ContactNumber({})
        primaryContactNumber.number=data.primaryContactNumber;
        primaryContactNumber.isPrimary=true;
        primaryContactNumber= await(primaryContactNumber.save())
        user.primaryContactNumber=primaryContactNumber._id

        if(data.contactNumbers!=null&&Array.isArray(data.contactNumbers)){
            data.contactNumbers.forEach(element => {
                let contactNumber=new ContactNumber({})
                contactNumber.number=element;
                contactNumber.isPrimary=false;
                contactNumber= await(contactNumber.save())
                user.contactNumbers.push(contactNumber._id)
            });
        }

        if(data.gender!=null){
            user.gender=data.gender
        }

        if(data.email!=null){
            let email=new ContactEmail({})
            email.email=data.email;
            email=email.save()
            user.email=email._id;
        }

        if(data.dob!=null){
            user.dob=data.dob
        }
        return user;

    } catch (error) {
        throw(error)
    }
}

module.exports={
    map_client_request
}
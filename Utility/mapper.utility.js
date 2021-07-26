const User=require('../Model/Users/user.model')
const ContactNumber=require('../Model/Contacts/contactNumber.model')
const ContactEmail=require('../Model/Contacts/email.model');

async function map_client_request(client,data){
    try {
        client.user=await(map_user_request(client.user,data))
        return client
    } catch (error) {
        throw(error)
    }
}

async function map_manpower_request(manpower,data){
    try {
        manpower.user=await(map_user_request(manpower.user,data));
        return manpower
    } catch (error) {
        throw(error)
    }
}

async function map_user_request(user,data){
    try {
        //required data entry
        if(data.userName!=null){
            user.userName=data.userName;
        }
        if(data.firstName!=null){
            user.firstName=data.firstName;
        }
        if(data.middleName!=null){
            user.middleName=data.middleName;
        }
        if(data.lastName!=null){
            user.lastName=data.lastName
        }
        if(data.passwordHash!=null){
            user.passwordHash=data.passwordHash;
        }
        if(data.primaryContactNumber!=null){
            let primaryContactNumber=user.primaryContactNumber
            primaryContactNumber.number=data.primaryContactNumber;
            primaryContactNumber.isPrimary=true;
            primaryContactNumber.isValidated=false;
        }
        if(data.contactNumbers!=null){
            if(Array.isArray(data.contactNumbers)){
                for (const element of data.contactNumbers) {
                    let contactNumber=user.contactNumbers.create();
                    contactNumber.number=element;
                    contactNumber.isPrimary=false;
                    contactNumber.isValidated=false;
                    // contactNumber= await(contactNumber.save())
                    user.contactNumbers.push(contactNumber)
                }
            }else{
                let contactNumber=user.contactNumbers.create();
                    contactNumber.number=data.contactNumbers;
                    contactNumber.isPrimary=false;
                    contactNumber.isValidated=false;
                    // contactNumber= await(contactNumber.save())
                    user.contactNumbers.push(contactNumber)
            }
        }

        if(data.permanentAddress!=null){
            user.permanentAddress=data.permanentAddress;
        }

        if(data.temporaryAddress!=null&&Array.isArray(data.temporaryAddress)){
            for (const element of data.temporaryAddress) {
                user.tempAddress.push(element)
            }
        }

        if(data.gender!=null){
            user.gender=data.gender
        }

        if(data.email!=null){
            // let email=new ContactEmail({})
            // email.email=data.email;
            // email=email.save()
            user.email={email:data.email}
        }

        if(data.dob!=null){
            user.dob=data.dob
        }
        if(data.images){
            user.images=data.images
            console.log("here")
        }
        return user;

    } catch (error) {
        throw(error)
    }
}
async function map_admin_request(admin,data){
    try {
        admin.user=await(map_user_request(admin.user,data));
        return admin
    } catch (error) {
        throw(error)
    }
}

module.exports={
    map_client_request,
    map_manpower_request,
    map_admin_request
}
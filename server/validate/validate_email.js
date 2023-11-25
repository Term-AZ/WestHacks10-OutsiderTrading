const exp = /^([a-zA-Z0-9_\.\-]+)@([\da-zA-Z\.\-]+)\.([a-zA-Z\.]{2,6})$/;

const validate_email = (email)=>{
    if(email.match(exp)){
        return true
    }
    return false
}

module.exports = validate_email
const exp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const validate_password = (password) =>{
    if(password.match(exp)){
        return true
    }
    return false
}

module.exports = validate_password
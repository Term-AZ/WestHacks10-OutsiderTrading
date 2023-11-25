const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const validate_token = (token) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    try{
        const verified = jwt.verify(token, jwtSecretKey)
        if(verified){
            return true
        }else{
            return false
        }
    }catch(err){
        console.log(err)
        return false
    }
}

module.exports = validate_token
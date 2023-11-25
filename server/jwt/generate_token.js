const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generate_token = (data) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY  
    const token = jwt.sign({user_id:12}, jwtSecretKey, {expiresIn: "2h"})
    return token
}

module.exports = generate_token
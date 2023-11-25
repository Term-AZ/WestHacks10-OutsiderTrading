var express = require('express');
var cors = require('cors')
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const saltRounds=10
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


var generate_token = require('./jwt/generate_token.js')
var validate_token = require('./jwt/validate_token.js')

var validate_email = require('./validate/validate_email.js')
var validate_password = require('./validate/validate_password.js')

var create_cypther = require('./encrypt/create_cypher.js')
var gen_uuid = require('./encrypt/create_uuid.js')

app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use("/", express.static('../client/public'))
app.use("/",express.static('../client/build'))

dotenv.config()
const port = process.env.port;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY


app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})

app.post('/user/register',(req,res)=>{
    const {firstname, lastname, email, password} = req.body

    if(!validate_email(email)){
        return res.status(400).send({"msg": "Please input valid email"})
    }
    if(!validate_password(password)){
        return res.status(400).send({"msg": "Password must be 6-16 character long and must contain at least one number and special character"})
    }

    var q = "SELECT * FROM users WHERE email = ?"
    db.query(q, [email], (err,result,fields)=>{
        console.log(result)
        if(result[0]==null){
            //user doesnt exist
            console.log("in here")
            bcrypt.genSalt(saltRounds, function(err,salt){
                if(err) {console.log(err); res.status(500).send({'msg': "Error has occured"})}
                bcrypt.hash(password, salt, function(err,hash){
                    
                    var entrystatement = 'INSERT INTO users(firstname,lastname, email, user_password, wallet_code) VALUES (?,?,?,?,?)'
                    db.query(entrystatement, [firstname,lastname, email, hash, process.env.WALLET_ID], (err)=>{
                        if(err) {console.log(err);return res.status(500).send({"msg": "Error has occured"})}
                        return res.status(200).send({"msg":"User added"})
                    })
                })
            })
        }else{
            return res.status(400).send({"msg": "Account with this email already exists"})
        }
    })
})

app.post('/user/login',(req,res)=>{

    const {email, password} = req.body
    if(!validate_email(email)){
        return res.status(400).send({"msg": "Input valid email"})
    }
    var q = 'SELECT * FROM users WHERE email = ?'
    db.query(q,[email],(err,result)=>{
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        console.log(result)
        if(result[0]!=null){
            bcrypt.compare(password, result[0].user_password, function(err, hashresult){
                if(err) {console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
                if(hashresult){
                    res.cookie(`Cookie Token`, result[0].id)
                    return res.send(generate_token())
                }else{
                    return res.status(400).send({"msg":"Password does not match"})
                }
            })

        }else{
            return res.status(404).send({"msg": "Email or password does not match"})
        }
    })
})

app.get('/get/senators',(req,res)=>{
    // try{
    //     const token = req.header(tokenHeaderKey)
    //     if(!validate_token(token)){
    //         return res.status(500).send({"msg":"Token expired"})
    //     }
    // }catch(err){
    //     return res.status(500).send({"msg":"Token expired"})
    // }
    var q = "SELECT * from senators"
    db.query(q,(err,result)=>{
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})
app.get('/get/senator_trades/:id',(req,res)=>{
    // try{
    //     const token = req.header(tokenHeaderKey)
    //     if(!validate_token(token)){
    //         return res.status(500).send({"msg":"Token expired"})
    //     }
    // }catch(err){
    //     return res.status(500).send({"msg":"Token expired"})
    // }
    const id = req.params.id
    var q = "SELECT senator_id, company_id, date, type, amount, company_name FROM senator_trades WHERE senator_trades = ? INNER JOIN company ON company.id = senator_trades.stock_id"
    db.query(q,[id],(err,result)=>{
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})

app.get('/user/submit_payment/:amount',(req,res)=>{
    const id = req.cookies["Cookie Token"]
    const amount = req.params.amount

    var q = "SELECT wallet_code FROM users WHERE id = ?"
    db.query(q,[id], (err,result)=>{
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        if(result[0]!=null){
            var wallet_code = result[0]["wallet_code"]
            var cypther = create_cypther()
            

            const url = 'https://api.circle.com/v1/w3s/developer/transactions/transfer';
            const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Bearer TEST_API_KEY:dc5f858a718e9413ba53029139daf93e:1accab0f2edc4f89ce77675957df37e9'
            },
            body: JSON.stringify({
                amounts: ['1.00'],
                entitySecretCiphertext: cypther,
                destinationAddress: '0x831fb5fb93470829237994f558cd891b74ea79ab',
                walletId: `${wallet_code}`,
                tokenId: 'e4f549f9-a910-59b1-b5cd-8f972871f5db',
                idempotencyKey: gen_uuid(),
                feeLevel: 'HIGH'
            })
            };
            fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));






            console.log(wallet_code)
        }else{
            return res.status(500).send({"msg":"Id not found"})
        }
    })

    // try{
    //     const token = req.header(tokenHeaderKey)
    //     if(!validate_token(token)){
    //         return res.status(500).send({"msg":"Token expired"})
    //     }
    // }catch(err){
    //     return res.status(500).send({"msg":"Token expired"})
    // }
    

})



app.get('/user/get_wallet',(req,res)=>{
    const id = req.cookies["Cookie Token"]
    var q = "SELECT wallet_code FROM users WHERE id = ?"

    db.query(q,[id], (err,result)=>{
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        if(result[0]!=null){
            var wallet_code = result[0]["wallet_code"]
            

            const url = `https://api.circle.com/v1/w3s/wallets/${wallet_code}/balances`;
            const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:dc5f858a718e9413ba53029139daf93e:1accab0f2edc4f89ce77675957df37e9'}
            };

            fetch(url, options)
            .then(res => res.json())
            .then(json => {console.log(json["data"]["tokenBalances"]); res.json(json)})
            .catch(err => console.error('error:' + err));

        }else{
            return res.status(500).send({"msg":"Id not found"})
        }
    })
})


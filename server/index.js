var express = require('express');
var cors = require('cors')
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const saltRounds=10
const fetch = require('node-fetch');

var generate_token = require('./jwt/generate_token.js')
var validate_token = require('./jwt/validate_token.js')

const bodyParser = require('body-parser')
var validate_email = require('./validate/validate_email.js')
var validate_password = require('./validate/validate_password.js')



app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
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
                    const options = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json',
                        Authorization: "Bearer TEST_API_KEY:dc5f858a718e9413ba53029139daf93e:1accab0f2edc4f89ce77675957df37e9"},
                        body: JSON.stringify({
                            blockchains: ['MATIC-MUMBAI'],
                            count: 1,
                            metadata: [{name: 'My Wallet 1', refId: 'grouptransaction123'}],
                            accountType: 'EOA',
                            idempotencyKey: '23fc8281-2871-43f0-b1fb-563439baddea',
                            entitySecretCiphertext: 'XC1Judp8aE5ZN8DoBs0OtK8YYjQFHiYUkLnPXxh/hCddidfk2fGtHLOLy7XkW7NhN6RWvsBXtr+d9gWU9Hv00H6ZXAtJFvmJEeIKs4CR7mQRdnRRIZEys6Px3SIkYfKIVkgH/UTeab+MMWeLYKCCFxJnzZNIxqVC/3a5badH2krGfb4fqYvv5D3NDTLUdIHzjVooeGfbOlBhnbqaUNNTqUQodmM1my2PL+MaRKaoLOGEFO4o+/4zs42bze2iv6jQnOWlMkAX/K2rnS4oK/9JdDIojcIxKbc1abFkb2fNfeWWKUn6ykHRDKpmDyQA48sib+QaJqSKBTm3+pTBrIqvBRuYz6IhuVJVBRADbETAOZ1TR9M1lru0TweexRItojttL/FR3+EvcDRQHQUFRkW+YhH2QgtWN258lMiT8a3icm8SAGw9rCK9svT2ZD7gMBNYNfElCxG2BuU0eRRSV/o/xb3tiuYDHnykwZ+3EU5sIQd1QoBVeRYw/EVUdjulDoFpyu0+QRH2Kn/PbH6UCCoAnq5G1DlWgLeQY/3u6sAfnSje2b5iI3XCNkU9wXhxjACIkppIHUxg2ni3Rf95cQogxgUk0TIMbREWQj8III7c6NOwdy0yZJkem13n8+Kj4iw2ff/pa48rei9bGyezUjJs9t4ZPyAuuUpfGoVoxKwoUfU=',
                            walletSetId: '018c0530-1369-716c-a769-80a039438bf3'
                        })
                      };
                      
                    fetch(process.env.WALLET_URL, options)
                        .then(res => res.json())
                        .then(json => console.log(json))
                        .catch(err => console.error('error:' + err));

                    // var entrystatement = 'INSERT INTO users(firstname,lastname, email, user_password, wallet_code) VALUES (?,?,?,?,?)'
                    // db.query(entrystatement, [firstname,lastname, email, hash, 123], (err)=>{
                    //     if(err) {console.log(err);return res.status(500).send({"msg": "Error has occured"})}
                    //     return res.status(200).send({"msg":"User added"})
                    // })
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
        if(result!=null){
            bcrypt.compare(password, result[0].user_password, function(err, hashresult){
                if(err) {console.log(err) ;return res.status(500).send({"msg":"Error has occured"})}
                if(hashresult){
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
    const token = req.header(tokenHeaderKey)
    if(!validate_token(token)){
        return res.status(500).send({"msg":"Token expired"})
    }
    var q = "SELECT * from senators"
    db.query(q,(err,result)=>{
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})
app.get('/get/senator_trades/:id',(req,res)=>{
    const token = req.header(tokenHeaderKey)
    if(!validate_token(token)){
        return res.status(500).send({"msg":"Token expired"})
    }
    const id = req.params.id
    var q = "SELECT senator_id, company_id, date, type, amount, company_name FROM senator_trades WHERE senator_trades = ? INNER JOIN company ON company.id = senator_trades.stock_id"
    db.query(q,[id],(err,result)=>{
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        return res.json(result)
    })
})

app.get
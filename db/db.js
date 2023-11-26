var mysql = require('mysql2')

db = mysql.createConnection({
    host:'database-1.czefro9i2zbd.us-east-1.rds.amazonaws.com',
    user:'admin',
    password: 'ywy957p3',
    database: 'hackwest_outsidertrading'
})

db.connect(function(err){
    if(err) throw err;
    console.log("Connected!")
})

module.exports = db
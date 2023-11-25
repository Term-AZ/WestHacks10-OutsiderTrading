var mysql = require('mysql2')

db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'ywy957p3',
    database: 'hackwest_outsidertrading'
})

db.connect(function(err){
    if(err) throw err;
    console.log("Connected!")
})

module.exports = db
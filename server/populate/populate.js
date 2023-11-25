const db = require('../../db/db.js')
const senators = require('./jsons/senatorDetails.json')
const sC001078 = require('./jsons/senatorC001078.json')
const sC001114 = require('./jsons/senatorC001114.json')
const sG000591 = require('./jsons/senatorG000591.json')
const sH001082 = require('./jsons/senatorH001082.json')
const sK000389 = require('./jsons/senatorK000389.json')
const sK000392 = require('./jsons/senatorK000392.json')
const sM001157 = require('./jsons/senatorM001157.json')
const sM001163 = require('./jsons/senatorM001163.json')
const sP000608 = require('./jsons/senatorP000608.json')
const sS000250 = require('./jsons/senatorS000250.json')
const sS001203 = require('./jsons/senatorS001203.json')
const sT000278 = require('./jsons/senatorT000278.json')

// console.log(senators.data)

// for(var i in senators.data){
//     console.log(senators.data[i])
//     var name = senators.data[i][0].split(" ")
//     var q = "INSERT INTO senators(id, first_name, last_name, party, state) VALUES(?,?,?,?,?)"
//     db.query(q,[senators.data[i][3], name[0], name[1],  senators.data[i][1],  senators.data[i][2]],(err)=>{
//         if(err)console.log(err)

//     })
// }

for(var i in sC001078.data){
    console.log(sC001078.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sC001078.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['C001078', sC001078.data[i][0], sC001078.data[i][2].replace(" ","-"), sC001078.data[i][4], sC001078.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}

for(var i in sC001114.data){
    console.log(sC001114.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sC001114.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['C001114', sC001114.data[i][0], sC001114.data[i][2].replace(" ","-"), sC001114.data[i][4], sC001114.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}

for(var i in sG000591.data){
    console.log(sG000591.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sG000591.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['', sG000591.data[i][0], sG000591.data[i][2].replace(" ","-"), sG000591.data[i][4], sG000591.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}
for(var i in sH001082.data){
    console.log(sH001082.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sH001082.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['H001082', sH001082.data[i][0], sH001082.data[i][2].replace(" ","-"), sH001082.data[i][4], sH001082.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}
for(var i in sK000389.data){
    console.log(sK000389.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sK000389.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['K000389', sK000389.data[i][0], sK000389.data[i][2].replace(" ","-"), sK000389.data[i][4], sK000389.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}


for(var i in sK000392.data){
    console.log(sK000392.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sK000392.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['K000392', sK000392.data[i][0], sK000392.data[i][2].replace(" ","-"), sK000392.data[i][4], sK000392.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}
for(var i in sM001157.data){
    console.log(sM001157.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sM001157.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['M001157', sM001157.data[i][0], sM001157.data[i][2].replace(" ","-"), sM001157.data[i][4], sM001157.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}for(var i in sM001163.data){
    console.log(sM001163.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sM001163.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['M001163', sM001163.data[i][0], sM001163.data[i][2].replace(" ","-"), sM001163.data[i][4], sM001163.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}for(var i in sP000608.data){
    console.log(sP000608.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sP000608.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['P000608', sP000608.data[i][0], sP000608.data[i][2].replace(" ","-"), sP000608.data[i][4], sP000608.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}for(var i in sS000250.data){
    console.log(sS000250.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sS000250.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['S000250', sS000250.data[i][0], sS000250.data[i][2].replace(" ","-"), sS000250.data[i][4], sS000250.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}

for(var i in sS001203.data){
    console.log(sS001203.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sS001203.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['S001203', sS001203.data[i][0], sS001203.data[i][2].replace(" ","-"), sS001203.data[i][4], sS001203.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}for(var i in sT000278.data){
    console.log(sT000278.data[i][0])
    var q = "INSERT IGNORE INTO company(company_name) VALUES(?)"
    db.query(q,[sT000278.data[i][0]],(err)=>{
        if(err) console.log(err)   
    })
    var qq = "INSERT INTO senator_trades(senator_id, company_id, trade_date, trade_type, amount) VALUES(?,?,?,?,?)"
    db.query(qq,['T000278', sT000278.data[i][0], sT000278.data[i][2].replace(" ","-"), sT000278.data[i][4], sT000278.data[i][5]],(err)=>{
        if(err)console.log(err)
    })     
}


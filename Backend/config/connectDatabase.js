const mongoose = require('mongoose');

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URL    ).then ((con)=>{
        console.log(`Mongodb connection to host ${con.connection.host}`)
    }).catch((err)=>{
        console.log(`Moogodb connection error ${err.message}`);
    })
}

module.exports=connectDatabase;
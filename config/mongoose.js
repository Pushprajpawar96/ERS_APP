

const mongoose = require('mongoose');

const DB = 'mongodb+srv://rp9665703458:Pass@cluster0.zqfdouy.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(DB).then(()=>{
     console.log('Connected to DataBase');
 }).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open',  function(){
     console.log('Successfully connect to DataBase');
});

 
module.exports = db;  




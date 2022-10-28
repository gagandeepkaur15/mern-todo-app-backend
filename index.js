const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');

}

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log("Connected!!")
});

const todoSchema = new mongoose.Schema({
    title: String,
    desc: String,
});

const Todo = mongoose.model('Todo',todoSchema);


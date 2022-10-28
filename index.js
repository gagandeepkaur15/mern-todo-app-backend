const mongoose = require('mongoose');
const express = require('express');
const Todo = require("./models/TodoModel");

const app=express();
const port = 3000
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log("Connected!!")
});

app.get('/fetchTodo', async (req, res) => {
    const todos = await Todo.find;
    res.json(todos);
})

app.post('/addTodo', (req, res) => {
    const newTodo = new Todo({ todo: req.body.todo }); 
    newTodo.save().then(()=>{
        res.json(newTodo);
        // res.send("Items saved to database")
    }).catch(()=>{
        res.status(400).send("Items not saved")
    });
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
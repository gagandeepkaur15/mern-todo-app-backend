const mongoose = require('mongoose');
const express = require('express');
const Todo = require("./models/TodoModel");
const cors = require('cors');

const app=express();
const port = 3000
app.use(express.json());
app.use(cors());

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
    res.send("API is running");
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

app.delete('/deletei/:id', async (req,res)=>{
    console.log(req.params.id);
    const finalTodo = await Todo.findByIdAndDelete(req.params.id);
    

    res.json(finalTodo);
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
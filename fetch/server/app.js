const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let id = 3;
const todoList = [
    { id: 1, text: 'todo 1', done: true },
    { id: 2, text: 'todo 2', done: false },
];

app.get('/api/todo', (req, res) => {
    res.json(todoList);
});

app.post('/api/todo', (req, res) => {
    const { text, done } = req.body
    todoList.push({
        id: id++,
        text,
        done,
    });
    return res.send('success');
});

app.listen(4000, ()=>{
    console.log("server start...");
});
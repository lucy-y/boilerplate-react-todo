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

app.delete('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    let index = todoList.findIndex(v=>v.id==id);
    if(index != -1){
        todoList.splice(index, 1);
        return res.send('success');
    } else {
        return res.status(400).send('item not found in list.');
    }
});

app.listen(4000, ()=>{
    console.log("server start...");
});
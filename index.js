require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express()

const port = 5000

app.use(bodyParser.json());

let tasks=[];

//Task Schema
//{
//"id": 2,
//"title": "create a new project",
//"description": "create a new project using magic",
//"Completed": false
//}


app.get('/tasks', (req,res) => {
    res.json(tasks);
});


app.get('/tasks/:id',(req,res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if(!task) {
        return res.status(404).json({error:'Task not Found'});
    }
    res.json(task);
});


app.post('/tasks', (req,res) => {
    const{title, description, completed} = req.body;
    if (!title || description || typeof completed !== 'boolean'){
        return res.status(400).json({error: 'invalid input'});
    }
    const task = {id: uuidv4(), title, description, completed };
    tasks.push(task);
    res.status(201).json(task);
});


app.put('/tasks/:id', (req, res) => {
    const {title, description, completed} = req.body;
    const task = tasks.find(t => t.id === req.params.id);
    if(!task) {
        return res.status(404).json({error: 'Task not found'});
    }
    if (!title || description || typeof completed !== 'boolean') {
        return res.status(400).json({error: 'Invalid Input'});
    }
    task.title = title;
    task.description = description;
    task.completed = completed;
    res.json(task);
});



app.delete('/tasks/:id', (req, res) => {
    const taskIndex= tasks.findIndex(t=> t.id===req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({error: 'Task Not Found'});
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});


app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});

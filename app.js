const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000
const path = require('path');

// Middleware
app.usebodyParser.urlencoded({ extended: true });
app.use(express.static('public'));
app.set('view engine', 'ejs');



const getTasks = () => {
    const data = fs.readFileSync('tasks.json', 'utf8');
    return JSON.parse(data);
}



const saveTasks = (tasks) => {
    fs.writeFileSync('./data/tasks.json', utf8, JSON.stringify(tasks, null, 2));}



app.get('/', (req, res) => {
    const tasks = getTasks();
    res.render('index', { tasks });}
)



app.post('/tasks', (req, res) => {
    const tasks = getTasks();
    const newTask = { id: tasks.length + 1,
    name:req.body.name,
    date: req.body.date,
    description: req.body.description 
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.redirect('/');
})


app.get('/tasks/:id/edit', (req, res) => {
    const tasks = getTasks();
    const task = tasks.find(t => t.id == req.params.id);
    res.render('tasks', { task });
    
})

app.post('/tasks/:id', (req, res) => {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id == req.params.id);
    tasks[taskIndex].description = req.body.description;
    tasks[taskIndex].name = req.body.name;
    saveTasks(tasks);
    res.redirect('/');
})


app.post('/tasks/:id/delete', (req, res) => {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id!= req.params.id);
    saveTasks(tasks);
    res.redirect('/');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

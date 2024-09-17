const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 4002

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');



const getTasks = () => {
    const data = fs.readFileSync('./data/tasks.json', 'utf8');
    return JSON.parse(data);
}



const saveTasks = (tasks) => {
    fs.writeFileSync('./data/tasks.json', JSON.stringify(tasks), 'utf8');}



app.get('/', (req, res) => {
    const tasks = getTasks();
    res.render('index', { tasks });}
)


// let createID = (tasks) => {
//     let maxId = 0;
//     tasks.forEach(task => {
//         if (task.id > maxId) {
//             maxId = task.id;
//         }
//     });
//     return maxId + 1;
// }


// app.post('/tasks', (req, res) => {
//     const tasks = getTasks();
//     const newTask = { id: createID(tasks),
//     name:req.body.name,
//     date: req.body.date,
//     description: req.body.description 
//     };
//     tasks.push(newTask);
//     saveTasks(tasks);
//     res.redirect('/');
// })


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
    tasks[taskIndex].date = req.body.date;
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

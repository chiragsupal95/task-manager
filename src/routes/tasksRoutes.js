const express = require('express');
const Task =  require('../models/tasksModel');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try{    
        await task.save();
        res.send(task)
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.get('/tasks', async (req, res)=> {
    try{
        const tasks = await Task.find({});
        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.get('/tasks/:id', async (req, res)=> {
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        if(!task){
            return res.status(400).send()
        }
        res.send(task);
    }
    catch(e){
        res.status(400).send(e);
    }
});

router.patch('/tasks/:id', async (req, res)=> {
    const allowedUpdates = ['task', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation =  updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(404).send('Invalid Input');
    }
    try{
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const task = await Task.findById(req.params.id);
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save();
        if(!task){
            return res.status(400).send();
        }
        res.send(task);
    }
    catch(e){
        res.status(400).send();
    }
});

router.delete('/tasks/:id', async (req, res)=> {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
           return res.status(404).send('No task found');
        }
        res.send('Task Deleted');
    }
    catch(e){
        res.status(400).send();
    }
})

module.exports = router
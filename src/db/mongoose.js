const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionString)

// const me = new User({
//     name: 'Mihir',
//     email: 'mihir@gmail.com',
//     password: '123456',
//     age: 22
// })

// me.save().then(()=> {
//     console.log(me);
// }).catch((error)=> {
//     console.log('ERROR', error);
// })

// const Task = mongoose.model('Task', {
//     task: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     task: 'Complete NodeJS course',
// }).save().then(()=> {
//     console.log(task);
// }).catch((error)=> {
//     console.log('ERROR', error);
// })
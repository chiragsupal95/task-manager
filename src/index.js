const express = require('express');
require('./db/mongoose');
const User = require('./models/usersModel');
const Task = require('./models/tasksModel');
const userRouter = require('../src/routes/userRoutes');
const taskRouter = require('../src/routes/tasksRoutes');

const app = express();

const port = 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken')
const myFun = async () => {
    const token = jwt.sign({ _id: 'cvs619' }, 'thisischirags')
    console.log(token);

    const data = jwt.verify(token, 'thisischirags');
    console.log(data);
}

myFun();

app.listen(port,()=> {
    console.log('(:::::: SERVER IS UP ON PORT '+ port +' ::::::)');
})




const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a word file'));
        }
        cb(undefined, true);
    }
})



app.post('/upload', upload.single('upload'),(req,res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})
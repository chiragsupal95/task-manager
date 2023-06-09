const express = require('express');
const User = require('../models/usersModel');
const router = new express.Router();
const auth =  require('../middleware/auth');
const multer = require('multer')



router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }
    catch (e){
        res.send(400).send(e);
    }
})

router.get('/users/me', auth, async (req, res)=> {
    // try{
    //     const users = await User.find({});
    //     res.send(users);
    // }
    // catch(e){
    //     res.status(500).send(e);
    // }
    res.send(req.user);
})

router.post('/users/logout', auth, async (req, res)=> {
    try{
        req.user.tokens = req.user.tokens.filter((token)=> {
            return token.token !== req.token
        })
        await req.user.save();
        res.send();
    } catch(e){
        res.status(500).send(e);
    }
});

router.post('/users/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/users/:id', async (req, res)=> {
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }   
    catch(e){
        res.status(500).send(e);
    }
})

router.patch('/users/me', auth,async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(404).send();
    }

    try{
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        //const user = await User.findById(req.user._id);
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save();
        if(!req.user){
            return res.send(400).send();
        }

        res.send(req.user);
    }
    catch(e){
        res.send(400).send(e);
    }
})


router.delete('/users/me', auth, async (req, res)=> {
    try{
        const user =  await User.findByIdAndDelete(req.user._id)
        if(!user){
            return res.status(404).send();
        }
        res.send();
    }
    catch(e){
        res.status(500).send();
    }
})


router.post('/users/login', async (req, res)=> {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    }
    catch(e){
        res.status(400).send(e);
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true);
    }
})

router.post('/users/me/avatar', upload.single('avatar'), async (req,res)=> {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router
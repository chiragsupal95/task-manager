//const mongodb = require('mongodb');
const {MongoClient, ObjectId} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databasename = 'task-manager';

const databaseName1 = 'tasks-collection';

const id  = new ObjectId();
console.log(id);
console.log(id.getTimestamp());

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=> {
//     if(error){
//         return console.log('Unable to connect to Database');
//     }
    
//     const db = client.db(databasename);
    
//     // db.collection('users').findOne({ _id: new ObjectId('642ac446e8afa06b4c43e7d8') }, (error, user)=> {
//     //     if(error){
//     //         return console.log('unable to fetch');
//     //     }
//     //     console.log(user);
//     // })
    
//     // db.collection('users').find({age:22}).toArray((error, users)=> {
//     //     if(error){
//     //         return console.log('unable to fetch records');
//     //     }
//     //     console.log(users);
//     // })

//     // const updatePromise = db.collection('users').updateOne({
//     //     _id: new ObjectId('642ac22672c61408e077013c')
//     // }, {
//     //     $set: {
//     //         name: 'Tanmay'
//     //     }
//     // })

//     // updatePromise.then((result)=> {
//     //     console.log(result);
//     // }).catch((error)=> {
//     //     console.log(error);
//     // })

//     db.collection('users').deleteMany({
//         age: 23
//     }).then((result)=> {
//         console.log(result);
//     }).catch((error)=> {
//         console.log(error);
//     })

// })

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect.');
    }

    const db = client.db(databaseName1);

    // let tasks = [
    //     {
    //         task: 'Complete nodeJs course',
    //         status: false
    //     },
    //     {
    //         task: 'Watch IPL match',
    //         status: false
    //     },
    //     {
    //         task: 'Do lunch',
    //         status: true
    //     }
    // ]

    // // db.collection('tasks-collection').insertMany(tasks, (error, result)=> {
    // //     if(error){
    // //         return console.log('insertion failed!');
    // //     }

    // //     console.log(result.ops);
    // // })
    // db.collection('tasks-collection').findOne({_id: new ObjectId('642bf04aa200135af464259f')}, (error, task)=>{
    //     if(error){
    //         return console.log('unable to fetch task');
    //     }
    //     console.log(task);
    // });

    // db.collection('tasks-collection').find({status: false}).toArray((error, tasks)=> {
    //     if(error){
    //         return console.log('unable to find tasks');
    //     }
    //     console.log(tasks);
    // })

    // db.collection('tasks-collection').updateMany({
    //     status: false
    // },{
    //     $set: {
    //         status: true
    //     }
    // }).then((result)=> {
    //     console.log(result);
    // }).catch((error)=> {
    //     console.log(error);
    // })

    // db.collection('tasks-collection').deleteMany({
    //     task: 'Do lunch'
    // }).then((result)=> {
    //     console.log(result);
    // }).catch((e)=> {
    //     console.log(e);
    // })

})
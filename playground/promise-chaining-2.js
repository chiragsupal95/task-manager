require('../src/db/mongoose');
const Task = require('../src/models/tasksModel');

// Task.findByIdAndDelete('642ff6413748642c4735020f').then((task)=> {
//     console.log(task);
//     return Task.countDocuments({ completed: false })
// }).then((result)=> {
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
}

deleteTaskAndCount('642ff67e3748642c47350213').then((count)=> {
    console.log(count);
}).catch((e)=> {
    console.log(e);
})
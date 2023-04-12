require('../src/db/mongoose');
const User = require('../src/models/usersModel');

// User.findByIdAndUpdate('642e7b8ea0350ad458778b58', { age: 1 }).then((user)=> {
//     console.log(user);
//     return User.countDocuments({ age: 1 })
// }).then((result)=> {
//     console.log(result);
// }).catch((error)=> {
//     console.log(error);
// })

const updateAgeAndCount = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age: age});
    const count = await User.countDocuments({ age: age });
    return count
}

updateAgeAndCount('642e7b8ea0350ad458778b58', 22).then((count)=>{
    console.log(count);
}).catch((e)=> {
    console.log(e);
})


const mongoose = require('mongoose');
const url = process.env.MONGO_URI;

// exports.connect = () => {
//     //Database connection
//     mongoose.connect(url)
//     .then(()=>{
//         console.log('Database connected Successfully');
//     })
//     .catch((error)=>{
//         console.log('Database connection error: ' + error);
//     })
// }

const connect = mongoose.connect(url)
.then(()=>{
    console.log('Database connection successfully');
})
.catch((error)=>{
    console.log('Database error: ' + error);
})


module.exports = connect;
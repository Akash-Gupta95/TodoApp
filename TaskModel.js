const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    task:{
        type:String,
        require:true
    },
    des:{
        type:String,
        
    }
})

const task = mongoose.model('user1', TaskSchema)
module.exports = task;
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
// cors
const cors = require('cors');
app.use(cors());

//body-pars
const bodyParser = require('body-parser')
app.use(bodyParser.json())



mongoose.connect(process.env.URI).then(()=>{
    console.log("DATABASE CONNECTED")
    app.listen(process.env.PORT ||8000 , (err)=>{
        if(err) console.log("Error in Server: " + err);
        console.log("Server Running... "+ process.env.PORT)
    });
}).catch((e)=>{
    console.log("error " + e);  
})

const taskModel = require('../TaskModel')




//Post
app.post('/post', async(req,res)=>{
    const {task , des} = req.body;

    try{
        const Newtask = await taskModel.create({
            task:task,
            des:des,
            headers:{
                "Content-Type": "application/json"
            }
        })

        res.status(201).json(Newtask);

    }catch(error){
        res.status(400).json({error:error.message})
    }
})



// Put 

app.put('/update/:id', async(req,res)=>{
     const {id}= req.params;
    const {task , des} = req.body;

    try{
        const update = taskModel.findByIdAndUpdate({_id:id}, {
            task:task,
            des:des,
            headers:{
                "Content-Type": "application/json"
            }
        })
       
        res.status(201).json(update);

    }catch(error){
        res.status(400).json({error:error.message})
    }
})


// get
app.get('/get', async(req,res)=>{
const allTask = await taskModel.find();

res.send(allTask);
})

//Delete

app.delete('/delete/:id', async (req,res)=>{
    const {id}= req.params;
    try{

        const DeleteTask = await taskModel.findByIdAndDelete({_id:id});
        res.status(200).json(DeleteTask);
    }catch(error){
        res.status(400).json(error)
    }
})
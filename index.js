const express = require('express');

const app = express();
const mongoose = require('mongoose');
const path = require('path')
const static_path = path.join(__dirname,"./public")

app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}));


mongoose.connect("mongodb+srv://Harpreet:Hs123456@cluster0.tebls.mongodb.net/Basic?retryWrites=true&w=majority",{useNewUrlParser:true ,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false }).
then(() => {
    console.log('connection Successfully')
}).catch((err) => {
    console.log('no connection')
}
)


// const middleware =(req, res,next) => {
//     console.log("middleware")
//     next();
// }
const Basic = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true},
})
const Information = mongoose.model('Information',Basic);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/',function(req,res){
   res.sendFile(__dirname + './public/css/main.css')
 })




app.post('/',function(req,res) {
    
        let registerInformation = new Information({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message
        })
       registerInformation.save();
       res.redirect('/');
    })
    


app.listen(3000, function(){
    console.log("Successfully running")
})
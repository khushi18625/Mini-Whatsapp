const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');   
}
main()
.then((result)=>{
    console.log("mongoose is working")
})
.catch((err)=>{
    console.log(err);
})

//New route
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chat/new",(req,res)=>{
   let {from, msg, to} = req.body;
   let newchat = new Chat({
    from: from,
    msg : msg,
    to: to,
    created_at : new Date()
   })
   newchat.save()
   .then((result)=>{
    console.log(result)
   })
   .catch((err)=>{
    console.log(err);
   })
   res.redirect("/chats");
})

app.get("/chats",async(req,res)=>{
 let chat = await Chat.find();
 res.render("index.ejs", {chat});
})

//edit
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
   res.render("edit.ejs", {chat});
})
//update
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {msg: newmsg, created_at : date} = req.body;
    console.log(newmsg,date);
    let updatedchat = await Chat.findByIdAndUpdate(id,{msg : newmsg, created_at: date},{new:true} ,{ runValidators: true})
    
    console.log(updatedchat);
    res.redirect("/chats");

})
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete((id));
    console.log(deletedChat);
    res.redirect("/chats");
})
app.listen(8080,()=>{
    console.log("Server is listining")
})

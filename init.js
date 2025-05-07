const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

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

let allchat = [
    {
        from: "kimtaehyung",
        to : "khushi",
        msg: "Hi what are u doing",
        created_at : new Date()

    },
    {
        from : "Suga",
        to : "Khushi",
        msg : "hello..",
        created_at : new Date()
    },
     {
        from: "saina",
        to : "saavi",
        msg : "can you give ur dress for my siste's mehndi",
        created_at : new Date()
     }

];

Chat.insertMany(allchat);

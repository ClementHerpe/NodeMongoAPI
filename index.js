const express = require('express');

const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000

//Connect to mongoDBAtlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true})
.then(() => {
    console.log("Connected to mongoDB");
}).catch((error) => { 
    console.log("oops !", error);
})

//Start server
app.listen(PORT, () => {
    console.log("Server started at port ", PORT);
});

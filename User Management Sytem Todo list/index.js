const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");
const express= require("express");
const app = express();
const router = express.Router();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")
);
app.set("view engine", "ejs");

// routes
app.use(require("./routes/index"))
app.use(require("./routes/todo"))


//for user routes
const userRoute = require('./routes/userRoute');
app.use('/', userRoute);


//for admin routes
const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);




app.listen(3000, function(){
console.log("Server is runnnig...");
});

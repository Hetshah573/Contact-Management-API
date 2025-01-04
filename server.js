const express=require("express");
const errorHandler=require('./middleware/errorHandler.js')
const dotenv=require("dotenv").config();
const app=express();
const port=process.env.PORT || 5000;
const connectDB=require('./config/dbConnection.js')

connectDB(); //connecting a database
// Middleware
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes.js"));
app.use("/api/users",require("./routes/userRoutes.js"));
app.use(errorHandler); //use to avoid html form when error occurs instead give a customized error
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
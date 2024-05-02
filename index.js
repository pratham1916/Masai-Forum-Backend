const express = require("express");
require('dotenv').config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { postRoute } = require("./routes/post.routes");

const app = express();
app.use(express.json());
app.use("/api",userRouter)
app.use("/api",postRoute)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Database is Connected');
        console.log(`Server is Running on Port ${process.env.PORT}`);
    }
    catch (error) {
        console.log(error);
    }
})
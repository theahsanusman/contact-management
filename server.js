const express = require('express');
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorHandler'); 
const connectDb = require('./config/dbConnnection');
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.use(express.json());
app.use("/api/user", require("./routes/user"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})
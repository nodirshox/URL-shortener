const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = require("./router/index");

// Database connection
const mongoDBUrl = process.env.CONNECTIONDB;

mongoose.connect(mongoDBUrl, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.error("Error in connecting db: " + err.message);
            process.exit(1);
        }
    }
);

mongoose.connection.once("open", () => {
    console.info("Connected to the database");
});

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.info("Server has started...");
});

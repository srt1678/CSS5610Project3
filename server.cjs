const express = require("express");
const user = require("./backend/user.api.cjs");
const urlPassword = require("./backend/urlPassword.api.cjs");
const share = require("./backend/share.api.cjs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require('dotenv').config()
const path = require('path');

const app = express();

const mongoDBEndpoint = 'mongodb+srv://srt1678:chensteve520@cluster0.eagoj1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDBEndpoint, {
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/urlPassword", urlPassword);
app.use("/api/share", share);

let frontend_dir = path.join(__dirname, 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(process.env.PORT || 8000, function () {
	console.log("Starting app now...");
});

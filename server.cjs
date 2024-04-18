const express = require("express");
const user = require("./backend/user.api.cjs");
const urlPassword = require("./backend/urlPassword.api.cjs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const mongoDBEndpoint =
	"mongodb+srv://srt1678:chensteve520@cluster0.eagoj1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

app.listen(8000, function () {
	console.log("Starting app now...");
});

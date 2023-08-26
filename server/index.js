require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/dbConnect");
const cors = require("cors");

const userRoutes = require("./routes/user");

const app = express();

dbConnect();

// middleware
app.use(cors({ Credential: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

app.listen(4000, () => console.log("server started in port 4000"));

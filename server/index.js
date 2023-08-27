require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/dbConnect");
const cors = require("cors");

const path = require("path");
const userRoutes = require("./routes/user");

const app = express();

dbConnect();

// middleware
app.use(cors({ Credential: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

const _dirname = path.resolve();
// console.log(__dirname);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../client/build"))); // frontend build folder
  app.get(
    "*",
    (req, res) =>
      res.sendFile(path.resolve(_dirname, "client", "build", "index.html")) // any route that is not api route
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running.."); // api route
  });
}

app.listen(4000, () => console.log("server started in port 4000"));

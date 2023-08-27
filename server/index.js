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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

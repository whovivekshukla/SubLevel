require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoute"); 

// middleware
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Subevel");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

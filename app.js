require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// rest of the packages
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const likeRouter = require("./routes/likeRoute");
const commentRouter = require("./routes/commentRoute");
const followRouter = require("./routes/followRoute");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/follow", followRouter);

app.get("/", (req, res) => {
  res.send("Welcome to SubLevel");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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

// importing the modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const router = require("./routes")
const { createUser, getUser, getAllUsers, deleteUser, returnCurrentUser } = require("./controllers/user");
const { isAdmin, isAuthenticated } = require("./middlewares/auth");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const trainRoutes= require("./routes/train");
const bookRoutes = require("./routes/book");
// app config
const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
// app.use("/api/user/", createUser);
// app.use("/api/user/:id", isAuthenticated, getUser);
// app.use("/api/user/", isAuthenticated, getAllUsers);
// app.use("/api/user/:id", isAuthenticated, deleteUser);
// app.use("/api/user/return", isAuthenticated, returnCurrentUser);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/train",trainRoutes)
app.use("/api/book",bookRoutes);
// mongodb
mongoose
  .connect("mongodb://localhost:27017/railway", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Database Connection Established at ${27017}`))
  .catch((err) => console.log(err));

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => console.log(`server started at ${PORT}`));

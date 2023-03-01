const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRoutes = require("./routes/AuthRoutes");
const path = require("path");
const PostRoutes = require("./routes/PostRoutes");
const ProfileRoutes = require("./routes/ProfileRoutes")
const { isLoggedInOrNot } = require("./middleware/isLoggedInOrNot");

// * DOT ENV CONFIGURATION -----
dotenv.config();

const port = process.env.PORT || 3000;

// * MONGODB CONNECTION --
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!!"))
  .catch((err) => console.log(err));

//  * MIDDLEWARE
app.use(express.static(path.join(__dirname, "./frontend/build")))
app.use(express.json());
app.use(cors({ origin: 'https://instagram-mern1.vercel.app' }));
app.use(express.urlencoded({ extended:true }))

// * ROUTES
app.use("/api/post", PostRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/profile", ProfileRoutes);
app.get("*", (req,res)=> {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"), (err) => {
    res.status(500).send(err)
  })
})

// * LISTENING THE SERVER...
app.listen(port, () => console.log(`Server is listening on port ${port}!`));

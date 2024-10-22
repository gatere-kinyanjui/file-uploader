import express from "express";
import path from "path";

import { userRouter } from "./routes/userRouter";
import { loginRouter } from "./routes/loginRouter";

const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing middleware
app.use("/", userRouter);
app.use("/login", loginRouter);

app.listen(5000, () => console.log("Uploader listening on port 5000!"));

import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import authRoute from "./routes/auth.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4200;

declare module "express-session" {
  export interface SessionData {
    user: string;
  }
}

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

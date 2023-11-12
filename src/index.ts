import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import path from "path";
import authRoute from "./routes/auth.route";

const app = express();
const port = process.env.PORT || 3000;

declare module "express-session" {
  export interface SessionData {
    user: { username: string };
    loginAttempts: number;
    lastLoginAttempt: number;
  }
}
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.get("/", async (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  const message = req.query.message;

  res.render("login", { message: message });
});

app.get("/register", (req, res) => {
  const user = req.session.user;

  if (user) {
    return res.redirect("/");
  }

  res.render("register");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

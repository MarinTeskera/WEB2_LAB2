import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import path from "path";
import authRoute from "./routes/auth.route";
import contentRoute from "./routes/content.route";

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
app.use("/content", contentRoute);

app.get("/", (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  res.render("index", { username: user.username });
});

app.get("/login", (req, res) => {
  const user = req.session.user;

  if (user) {
    return res.redirect("/");
  }

  res.render("login");
});

app.get("/register", (req, res) => {
  const user = req.session.user;

  if (user) {
    return res.redirect("/");
  }

  res.render("register");
});

app.get("/unsecure/", (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/unsecure/login");
  }

  res.render("unsecure/index", { username: user.username });
});

app.get("/unsecure/login", (req, res) => {
  const user = req.session.user;

  if (user) {
    return res.redirect("/unsecure/");
  }

  res.render("unsecure/login");
});

app.get("/unsecure/register", (req, res) => {
  const user = req.session.user;

  if (user) {
    return res.redirect("/unsecure/");
  }

  res.render("unsecure/register");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

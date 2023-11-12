import { Router } from "express";
import { login, register, unsafeRegister } from "../helpers/auth";
import { canLogIn } from "../helpers/canLogIn";

const router = Router();

router.get("/user", (req, res) => {
  res.send(req.session.user);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await register(username, password);
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!canLogIn(req.session)) {
      return res.status(400).send("Too many login attempts");
    }

    const user = await login(username, password);
    req.session.user = user;
    req.session.loginAttempts = 0;

    return res.redirect("/");
  } catch {
    if (req.session.loginAttempts) {
      req.session.loginAttempts++;
    } else {
      req.session.loginAttempts = 1;
    }

    req.session.lastLoginAttempt = new Date().getTime();
    res.redirect("/login");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect("/login");
    }
  });
});

export default router;

import { Router } from "express";
import { login, register, unsafeLogin } from "../helpers/auth";
import { canLogIn } from "../helpers/canLogIn";

const router = Router();

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
  const { username, password, enableLoginAttack, enableInjection } = req.body;
  try {
    if (!canLogIn(req.session) && !enableLoginAttack) {
      return res.redirect(`/login?message=You have been timed out.`);
    }

    var user;
    if (enableInjection) {
      user = await unsafeLogin(username, password);
    } else {
      user = await login(username, password);
    }
    req.session.user = user[0];
    req.session.loginAttempts = 0;

    return res.redirect(`/login?message=${JSON.stringify(user)}`);
  } catch {
    if (req.session.loginAttempts) {
      req.session.loginAttempts++;
    } else {
      req.session.loginAttempts = 1;
    }

    req.session.lastLoginAttempt = new Date().getTime();
    res.redirect(`/login?message=Invalid username or password`);
  }
});

export default router;

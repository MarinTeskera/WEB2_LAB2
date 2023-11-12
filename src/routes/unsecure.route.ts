import { Router } from "express";
import { unsafeLogin, unsafeRegister } from "../helpers/auth";
import { canLogIn } from "../helpers/canLogIn";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await unsafeRegister(username, password);
    req.session.user = user;
    res.redirect("/unsecure");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await unsafeLogin(username, password);
    req.session.user = user;
    req.session.loginAttempts = 0;

    return res.redirect("/unsecure");
  } catch {
    res.redirect("/unsecure/login");
  }
});

export default router;

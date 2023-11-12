import { Router } from "express";
import { login, register } from "../helpers/auth";

const router = Router();

router.get("/user", (req, res) => {
  res.send(req.session.user);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await register(username, password);
    req.session.user = user;
    res.send(user);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);
    req.session.user = user;
    res.send(user);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

router.post("/logout", (req, res) => {
  req.session.user = undefined;
});

export default router;

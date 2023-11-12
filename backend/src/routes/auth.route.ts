import { Router } from "express";
import { login, register } from "../helpers/auth";

const router = Router();

router.get("/user", (req, res) => {
  console.log(req.session.user);
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
    console.log(req.session.user);
    req.session.user = user;
    console.log(req.session.user);

    res.send(user);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(void 0);
    }
  });
});

export default router;

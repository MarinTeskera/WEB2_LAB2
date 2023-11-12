import { Router } from "express";
import { createContent, unsafeCreateContent } from "../helpers/content";

const router = Router();

router.post("/create", async (req, res) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).send("Missing value");
  }

  const user = req.session.user;

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  try {
    await createContent(user.username, value);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

router.post("/unsecure/create", async (req, res) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).send("Missing value");
  }

  const user = req.session.user;

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  try {
    await unsafeCreateContent(user.username, value);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

export default router;
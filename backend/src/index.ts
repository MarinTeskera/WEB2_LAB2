import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";

const app = express();
const port = process.env.PORT || 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send(JSON.stringify({ Hello: "World" }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

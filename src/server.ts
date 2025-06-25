import express from "express";
import { api } from "./api/index.js";

const port = 3000;
const app = express();

app.use("/api", api);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

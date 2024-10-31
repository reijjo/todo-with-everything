import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("hello todo");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}.`);
});

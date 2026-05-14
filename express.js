const express = require("express");
const app = express();
const port = 3000;

app.use(express.json(), (req, res, next) => {
  console.log("Request received:", req.method, req.url);
  res.send("Request received");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

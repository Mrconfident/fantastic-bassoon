const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  } else if (req.url === "/about") {
    res.write("This is about page");
    res.end();
  } else {
    res.write("Page not found");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

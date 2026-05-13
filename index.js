const fs = require("fs");

fs.writeFile("hey.txt", "Tarun Lunia", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("file created");
  }
});

fs.appendFile("hey.txt", " is a good boy", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("file updated");
  }
});

fs.rename("hey.txt", "tarun.txt", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("file renamed");
  }
});

fs.copyFile("tarun.txt", "tarun_copy.txt", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("file copied");
  }
});

fs.unlink("tarun_copy.txt", (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("file deleted");
  }
});

fs.rmdir("./copy", { recursive: true }, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("folder deleted");
  }
});

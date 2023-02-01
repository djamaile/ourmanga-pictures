const fs = require("fs");
const path = require("path");

const directory = "./sevenseas";

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    const fileName = file.toString();
    const fileNameParts = fileName.split("_");
    if(!fileNameParts.at(-1).match("135x190.jpg")){
        fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
        });
    }
  }
});

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const PWD = __dirname;
const folders = [
    {
        "source": "../t1-repo/src/react-app/pages", // T1 pages, path relative to this file
        "dest": "../src/react-app/pages" // T2 pages, path is relative to this file
    }
]

// resolve all the paths
folders.forEach(monitorFolder => {
    monitorFolder.source = path.resolve(path.join(PWD, monitorFolder.source));
    monitorFolder.dest = path.resolve(path.join(PWD, monitorFolder.dest));
});


async function findFilesRecursively(directoryPath, relativeTo) {
  let foundFiles = [];

  try {
    const items = await fs.readdir(directoryPath, { withFileTypes: true }); // Symbolic files will NOT returned!!!

    for (const item of items) {
      const itemPath = path.join(directoryPath, item.name);

      if (item.isFile()) {
        foundFiles.push(relativeTo ? path.relative(relativeTo, itemPath) : itemPath);
      } else if (item.isDirectory()) {
        const subFiles = await findFilesRecursively(itemPath);
        foundFiles = foundFiles.concat(subFiles);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${directoryPath}:`, err);
  }

  return foundFiles;
}

function convertToArray(obj) {
  if (!obj.length) return [];
  var result = []
  for(var i=0; i<obj.length; i++) {
    result.push(obj[i])
  }
  return result;
}


await (async () => {
    folders.forEach(async monitorFolder => {
      var sourceFiles = await findFilesRecursively(monitorFolder.source, monitorFolder.source)
      var destFiles = await findFilesRecursively(monitorFolder.dest, monitorFolder.dest)

      sourceFiles = convertToArray(sourceFiles);
      destFiles = convertToArray(destFiles);

      sourceFiles.forEach(sourceFile => {
        if (destFiles.includes(sourceFile)) {
          let s = path.join(monitorFolder.source, sourceFile);
          let d = path.join(monitorFolder.dest, sourceFile);
          console.log(`Copying files from ${s} to ${d}...`)
          fs.copyFile(s, d)
        }
      })

    });
    
})()

const path = require('path');
const fs = require('fs');

let pkgFile = path.resolve(__dirname, '../release/Mditor-darwin-x64/Mditor.app/Contents/Resources/app/package.json');
let buffer = fs.readFileSync(pkgFile);
let pkg = JSON.parse(buffer.toString());
delete pkg.devDependencies;
delete pkg.scripts;
delete pkg.dev;
fs.writeFile(pkgFile, JSON.stringify(pkg, null, 2));

const fs = require('fs');

const readstr = fs.readFileSync('./1-node-farm/final/txt/input.txt','utf-8');
console.log(readstr);

const txtOut = `This is what we know about Avacados : \n${readstr}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./1-node-farm/final/txt/new_output.txt',txtOut);
console.log('write complete');
const fs = require('fs');

const readstr = fs.readFileSync('./1-node-farm/final/txt/input.txt','utf-8');
console.log(readstr);

const txtOut = `This is what we know about Avacados : \n${readstr}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./1-node-farm/final/txt/new_output.txt',txtOut);
console.log('write complete');

// asynchronous way -> non blocking
fs.readFile('./1-node-farm/final/txt/new_output.txt','utf-8',(err,data)=>{
    console.log(data);
})
console.log('Reading File...');

fs.readFile('./1-node-farm/final/txt/start.txt','utf-8',(err , data)=>{
    if(err)  return console.log('errorrrrrrrr')
    fs.readFile(`./1-node-farm/final/txt/${data}.txt`,'utf-8',(err , data1)=>{
        console.log(data1);
        fs.readFile(`./1-node-farm/final/txt/final.txt`,'utf-8',(err , data2)=>{
            console.log(data2);
            fs.writeFile('./1-node-farm/final/txt/ayncfinal.txt',`${data1}\n\n\n${data2}`,'utf-8',err=>{
                console.log('File has been written....');
            })
        })
    })
})



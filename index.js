const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

// const readstr = fs.readFileSync('./1-node-farm/final/txt/input.txt','utf-8');
// console.log(readstr);

// const txtOut = `This is what we know about Avacados : \n${readstr}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./1-node-farm/final/txt/new_output.txt',txtOut);
// console.log('write complete');

// // asynchronous way -> non blocking
// fs.readFile('./1-node-farm/final/txt/new_output.txt','utf-8',(err,data)=>{
//     console.log(data);
// })
// console.log('Reading File...');

// fs.readFile('./1-node-farm/final/txt/start.txt','utf-8',(err , data)=>{
//     if(err)  return console.log('errorrrrrrrr')
//     fs.readFile(`./1-node-farm/final/txt/${data}.txt`,'utf-8',(err , data1)=>{
//         console.log(data1);
//         fs.readFile(`./1-node-farm/final/txt/final.txt`,'utf-8',(err , data2)=>{
//             console.log(data2);
//             fs.writeFile('./1-node-farm/final/txt/ayncfinal.txt',`${data1}\n\n\n${data2}`,'utf-8',err=>{
//                 console.log('File has been written....');
//             })
//         })
//     })
// })

//////////////////////////////////////////////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/1-node-farm/final/dev-data/data.json`,'utf-8');
const prd_data = JSON.parse(data);


const server = http.createServer((req , res) =>{
    // console.log(req.url);
    const pathName = req.url;
    if(pathName === '/' | pathName === '/overview')    res.end('This is the overview page');
    // res.end('Hello World Server..!');
    else if (pathName === '/product')    res.end('This is the product Page');
    else if(pathName === '/api'){
        res.writeHead(200 , {'content-type':'application/json'});
        res.end(data);
    }  
    else{
        res.writeHead(404 , {
            'content-type':'text/html'
        });
        res.end('<h1>page not found.</h1>');
    }  
});

server.listen(8000 , '127.0.0.1',()=>{
    console.log('Listening to requests on port 8000');
});

////////////////////////////////////////////////////////////



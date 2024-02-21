///////////////////////////////// MODULES ///////////////////////////////
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

/////////////////////////////////SERVER//////////////////////////////////
const replaceTemplate = (temp , prod) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,prod.productName);
    output = output.replace(/{%IMAGE%}/g,prod.image);
    output = output.replace(/{%PRICE%}/g,prod.price);
    output = output.replace(/{%FROM%}/g,prod.from);
    output = output.replace(/{%NUTRIENTS%}/g,prod.nutrients);
    output = output.replace(/{%QUANTITY%}/g,prod.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,prod.description);
    output = output.replace(/{%ID%}/g,prod.id);

    if(!prod.organic)  output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
}
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const prd_data = JSON.parse(data);


const server = http.createServer((req , res) =>{
    const pathName = req.url;
    // overview page
    if(pathName === '/' | pathName === '/overview'){
        res.writeHead(200 , {'Content-type':'text/html'});
        const cardsHtml = prd_data.map(ele=>{
            return replaceTemplate(cardTemplate , ele);
        }).join('');
        const output = overviewTemplate.replace('{%PRODUCT_CARDS%}',cardsHtml);
        // console.log(cardsHtml);
        res.end(output);
    }    
    // product page
    else if (pathName === '/product'){
        res.writeHead(200 , {'Content-type':'text/html'});
        res.end(productTemplate);
    }  
    // api
    else if(pathName === '/api'){
        res.writeHead(200 , {'content-type':'application/json'});
        res.end(data);
    }  
    // not found
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
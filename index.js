const express = require("express");
var app = express();
var fetch = require('node-fetch');
const port = process.env.PORT || 8800;

// const jsonServer = require("json-server");
    // const path = require("path");
    // const server = jsonServer.create();
    // const router = jsonServer.router(path.join(__dirname, "listDB.json"));
    // const middlewares = jsonServer.defaults();
    // server.use(middlewares);
    // server.use(router);
    // server.listen(8080, () => {
    //   console.log("JSON Server is running");
    // });

var http = require("http");
setInterval(function() {
    http.get("http://jimmy-forexapp.herokuapp.com");
}, 300000); // every 5 minutes (300000)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "'https://forexapp.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/rates/:currencyId", function(req, resp){
    var currencyId = req.params.currencyId;
    fetch("https://api.exchangeratesapi.io/latest?base="+currencyId+"&symbols=CAD,USD,GBP,EUR,AUD,CHF,CNY,RUB,BRL,PHP,SGD,THB,JPY").then(function(resp){
			
        return resp.json();
    }).then(function(json){
        console.log(json);
        resp.json(json);
    });

})

app.get("/history/:dataObj", function(req, resp){
    var dataObj = JSON.parse(req.params.dataObj);
    console.log(dataObj)
    fetch("https://api.exchangeratesapi.io/history?start_at="+dataObj.staDate+"&end_at="+dataObj.curDate+"&symbols="+dataObj.quoCurr+"&base="+dataObj.baseCurr+"").then(function(resp){
			
        return resp.json();
    }).then(function(json){
        console.log(json);
        resp.json(json);
    });

})

app.listen(port, function(err){

if(err){
	console.log("Code doesn't work, Jimmy: "+err);
	return false;
}

console.log("Port is open for Jimmy!!")

});

const express = require("express");
var app = express();
var fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
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

app.get("/history", function(req, resp){
    
    fetch("https://api.exchangeratesapi.io/history?start_at=2019-01-01&end_at=2019-01-19&symbols=USD&base=CAD").then(function(resp){
			
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

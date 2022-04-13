const express = require('express');
const app = express();
const port = 3001;

function getBestNoMoves(s,n){
    return(s-1-Math.floor((s-1)/(n+1))*(n+1));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

app.get("/easy/startingValues",(req,res)=>{
    const maxPerTurn = getRndInteger(2,5);
    const size = 1+getRndInteger(3,5)*(maxPerTurn+1)+getRndInteger(1,maxPerTurn);
    res.send({size:size,maxPerTurn:maxPerTurn});
});

app.get("/easy/noMoves/:currentSize/:maxNoMoves",(req,res)=>{
    const currentSize = parseInt(req.params.currentSize);
    const maxNoMoves = parseInt(req.params.maxNoMoves);
    if(isNaN(currentSize)||isNaN(maxNoMoves)){
        res.sendStatus(400).send('one or more of the parameters is NaN')
    }else{
        res.send(getRndInteger(1,maxNoMoves).toString());
    }
});

app.get("/hard/startingValues",(req,res)=>{
    const maxPerTurn = getRndInteger(2,5);
    const size = 1+getRndInteger(3,5)*(maxPerTurn+1)+getRndInteger(1,maxPerTurn);
    res.send({size:size,maxPerTurn:maxPerTurn});
});

app.get("/hard/noMoves/:currentSize/:maxNoMoves",(req,res)=>{
    const currentSize = parseInt(req.params.currentSize);
    const maxNoMoves = parseInt(req.params.maxNoMoves);
    if(isNaN(currentSize)||isNaN(maxNoMoves)){
        res.sendStatus(400).send('one or more of the parameters is NaN')
    }else{
        const noMoves = getBestNoMoves(currentSize, maxNoMoves);
        if(noMoves===0){
            res.send(getRndInteger(1,maxNoMoves).toString());
        }else{
            res.send(getBestNoMoves(currentSize, maxNoMoves).toString());
        }
    }
});

app.get("/unbeatable/startingValues",(req,res)=>{
    const maxPerTurn = getRndInteger(2,5);
    const size = 1+getRndInteger(3,5)*(maxPerTurn+1);
    res.send({size:size,maxPerTurn:maxPerTurn});
});

app.get("/unbeatable/noMoves/:currentSize/:maxNoMoves",(req,res)=>{
    const currentSize = parseInt(req.params.currentSize);
    const maxNoMoves = parseInt(req.params.maxNoMoves);
    if(isNaN(currentSize)||isNaN(maxNoMoves)){
        res.sendStatus(400).send('one or more of the parameters is NaN')
    }else{
        res.send(getBestNoMoves(currentSize, maxNoMoves).toString());
    }
});

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});
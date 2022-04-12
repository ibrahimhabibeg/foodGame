const express = require('express');
const app = express();
const port = 3001;

function getBestNoMoves(s,n){
    return(s-floor(s/(n+1))*(n+1)-1);
}

app.get("/hard/noMoves/:currentSize/:maxNoMoves",(req,res)=>{
    const currentSize = parseInt(req.params.currentSize);
    const maxNoMoves = parseInt(req.params.maxNoMoves);
    if(isNaN(currentSize)||isNaN(maxNoMoves)){
        res.sendStatus(400).send('one or more of the parameters is NaN')
    }else{
        return getBestNoMoves(currentSize, maxNoMoves);
    }
});

app.get("/hard/IBegin/:totalSize/:maxPerTurn",(req,res)=>{
    const totalSize = parseInt(req.params.totalSize);
    const maxPerTurn = parseInt(req.params.maxPerTurn);
    if (isNaN(totalSize) || isNaN(maxPerTurn)) {
        res.sendStatus(400).send('one or more of the parameters is NaN')
    }else{
        if (totalSize%(maxPerTurn+1)===0) {
            res.send(true);
        }else{
            res.send(false);
        }
    }
});

app.get("/unbeatable/noMoves/:currentSize/:maxNoMoves",(req,res)=>{
    const currentSize = parseInt(req.params.currentSize);
    const maxNoMoves = parseInt(req.params.maxNoMoves);
    if(isNaN(currentSize)||isNaN(maxNoMoves)){
        res.sendStatus(400).send('one or more of the parameters is NaN')
    }else{
        return getBestNoMoves(currentSize, maxNoMoves);
    }
});

app.get("/unbeatable/IBegin/:totalSize/:maxPerTurn",(req,res)=>{
    const totalSize = parseInt(req.params.totalSize);
    const maxPerTurn = parseInt(req.params.maxPerTurn);
    if (isNaN(totalSize) || isNaN(maxPerTurn)) {
        res.sendStatus(400).send('one or more of the parameters is NaN')
    }else{
        if (totalSize%(maxPerTurn+1)===0) {
            res.send(false);
        }else{
            res.send(true);
        }
    }
});

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});
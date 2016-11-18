import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';
const _ = require('lodash');

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

app.get('/task3A', (req, res, next) => {
    let pc = {};
    fetch(pcUrl)
        .then((result) => result.json())
        .then(PC => res.json(PC))
        .catch(err => {
            next(err);
        });
});

app.get('/task3A/:var', (req, res, next) => {
    if (req.params.var == 'volumes'){
        next();
    } else{
        let pc = {};
        fetch(pcUrl)
            .then(async (result) => {
                pc = await result.json();
                if(pc.hasOwnProperty(req.params.var)){
                    res.json(pc[req.params.var]);
                } else{
                    next(new Error("Not Found"));
                }
            })
            .catch(err => {
                next(err);
            });
    }
});

app.get('/task3A/volumes', (req, res, next) => {
    
    let pc = {};
    let result = {};
     fetch(pcUrl)
     .then(async (result) => {
     pc = await result.json();
         if(_.has(pc, "hdd")){
             const mas = [];
             for (var i=0; i < pc["hdd"].length; i++){
                 if (mas.indexOf(pc["hdd"][i].volume) == -1){
                     mas.push(pc["hdd"][i].volume);
                     let rr= pc["hdd"][i].volume;
    
                     result[rr] = result[rr] || 0;
                     result[rr] += pc["hdd"][i].size;
                 } else {
                     let rr= pc["hdd"][i].volume;
                     result[rr] += pc["hdd"][i].size;
                 }
             }
             
             for(var key in result){
                 result[key] += "B";
             }
             
             res.json(result);
             
         } else {
             next(new Error("Not Found"));
         }
     })
     .catch(err => {
     next(err);
     });
});

app.get('/task3A/:var/:var2', (req, res, next) => {
    
    let pc = {};
    fetch(pcUrl)
        .then(async (result) => {
            pc = await result.json();

            if(pc.hasOwnProperty(req.params.var)){

                if(!_.isArray(pc[req.params.var])){

                    if (_.has(pc[req.params.var],req.params.var2)){

                        res.json(pc[req.params.var][req.params.var2]);

                    } else {
                        next(new Error("Not Found"));
                    }
                } else {
                    
                    if (_.has(pc[req.params.var], pc[req.params.var][req.params.var2]) 
                            || ( req.params.var2 !== 'length' && pc[req.params.var][req.params.var2])){
                        
                        res.json(pc[req.params.var][req.params.var2]);
                        
                    } else {
                        
                        next(new Error("Not Found"));
                    }

                }
            } else{
                next(new Error("Not Found"));
            }

        })
        .catch(err => {
            next(err);
        });
});

app.get('/task3A/:var0/:var1/:var2', (req, res, next) => {
    
    let pc = {};
    fetch(pcUrl)
        .then(async (result) => {
            pc = await result.json();
            
            if(_.has(pc, [req.params.var0, req.params.var1, req.params.var2]) &&
                                req.params.var2 !== 'length'){

                res.json(pc[req.params.var0][req.params.var1][req.params.var2]);

            } else {
                next(new Error("Not Found"));
            }
        })
        .catch(err => {
            next(err);
        });

});

app.use(function(err, req, res, next) {
    res.status(err.status || 404).send("Not Found");
});

app.listen(3000, () => {
    console.log('Your app listening on port 3000!');
});
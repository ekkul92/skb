import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World'
  });
});

app.get('/task2A', (req, res) => {
  const sum = (parseInt(req.query.a) || 0) + (parseInt(req.query.b) || 0);
  res.send(sum + '');
});

app.get('/task2B', (req, res) => {
    req.query.fullname = req.query.fullname || '';
    const arr = req.query.fullname.trim().replace(/(\s)+/g, ' ').split(' ');
    let result = '';
    switch (arr.length){
        case 3:
            result = arr[2].slice(0,1).toUpperCase() + arr[2].slice(1,arr[2].length).toLowerCase() + ' ' 
                    + arr[0].substring(0,1).toUpperCase() + '. ' 
                    + arr[1].substring(0,1).toUpperCase() + '.';
            break;
        case 2:
            result = arr[1].slice(0,1).toUpperCase() + arr[1].slice(1,arr[1].length).toLowerCase() 
                + ' ' + arr[0].substring(0,1).toUpperCase() + '.';
            break;
        case 1:
            result = arr[0]? arr[0].slice(0,1).toUpperCase() + arr[0].slice(1,arr[0].length).toLowerCase() :
                'Invalid fullname';
            break;
        default:
            result = 'Invalid fullname';
    }
    
   res.send(!(/[0-9]|_|\/|\\/i
         .test(req.query.fullname.replace(/(\s)+/g, '')))?
         result : 'Invalid fullname');
    
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

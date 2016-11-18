import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/kulikova_skb3'); ////!!!!!!!

const Pet = mongoose.model('pet', {
    type: String,
    name: String
});

const kitty = new Pet({
    name: 'ZZZ',
    type: 'cat'
});

kitty.save()
    .then(() => {
        console.log('success');
    })
    .catch(() =>{
        console.log('err')
    });
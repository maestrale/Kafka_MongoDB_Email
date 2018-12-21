var schedule=require('node-schedule');
var mongodb=require('mongodb');
var MongoClient=require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
let DatabaseService=require('./query'); 
const fetch = require('node-fetch');
var ip = require('ip');


const options = {
    dbName: 'test',
    collectionName: 'cartelliniTris',
    query: { $match: { numLinea : '3354323423', "date": {$gte: '20181001', $lte: '20181103'} }}
};
let when={
    atSecond: '3 * * * * *', 
    atMinute: '3 * * * *',
};

var ip_address=ip.address();
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('\nServices will Connect to this Ip Address: '+add, '\n');
  ip_address=add;
  //return ip_address;
})
let addresses={
  email_service: `http://${ip_address}:3002`,
  kafka_service: `http://${ip_address}:3003`,
};

let run = () => {
  console.log('\n', new Date, "Mongo Service, connecting to", url);
  schedule.scheduleJob(when.atSecond, () => {
    MongoClient.connect(url)
    .then(function (database, err) {
      if(err)console.log(err);
      let results= DatabaseService.query(database, err, options);
      return results; 
    })
    .then((results)=>{
      for (key in addresses){
        let address=addresses[key];
        let postApi="/api/email/new";
        let postOptions = {
          method: 'POST',
          headers: {  
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(results)
        };
        fetch(address + postApi, postOptions)
        .then(res => console.log(res.status, 'for', address))
        .catch(err => console.log('/post/ error:', err));
      }
    })
   .catch(err=>console.log(err))
 });
}

run();
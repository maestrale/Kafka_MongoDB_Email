var schedule=require('node-schedule');
var mongodb=require('mongodb');
var MongoClient=require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
let EmailService=require('./emailService'); 
var KafkaService=require('./kafka/producer_kafka');
let DatabaseService=require('./query'); 

const options = {
    dbName: 'test',
    collectionName: 'cartelliniTris',
    query: { $match: { numLinea : '3354323423', "date": {$gte: '20181001', $lte: '20181103'} }}
};
let when={
    atSecond: '39 * * * * *', 
    atMinute: '39 * * * *',
};

let run = () => {
  
  console.log(new Date, "Index.js, connecting to", url);
  schedule.scheduleJob(when.atSecond, () => {
    MongoClient.connect(url)
    .then(function (database, err) {
      if(err)console.log(err);
      return DatabaseService.query(database, err, options);
    })
    
    .then((data, err) => {
      if(err)console.log(err);
      let random=Math.floor(Math.random() * data.length) + 1;
      let bit={
        _id: data[random]._id,
        macroFamiglia: data[random].cdrList[0].macroFamiglia
      };
      let emailConfig={ receiver: 'francesco.kolman@gmail.com' }
      return EmailService.sendEmail(bit, emailConfig);
    })
    
    .then((info, err) => {
      if(err)console.log(err);
      console.log('2nd .then(), mail response: ', info.response);
      let record = {
          userId: '9438jd',
          data: info.response,
          sessionId: 'i23d',
          type: 'blb'
      };
      KafkaService.sendRecord(record, (err, response)=>{
          if(err)console.log('service err: ', err);
          console.log('Kafka response:', response);
      })
    })
    
    .catch(function (err) {})
 });
}

run();
// REMEMBER to launch kafka software first. 
// inside the kafka folder in francesco:
// bin/zookeeper-server-start.sh config/zookeeper.properties
// bin/kafka-server-start.sh config/server.properties
const express = require('express');
var KafkaService=require('./kafka_producer');

module.exports = function (app) {
  const apiRoutes = express.Router(),
        emailRoutes = express.Router();

        apiRoutes.use('/email', emailRoutes);
        emailRoutes.post('/new', (req, res) => {
            
            console.log('\nREQ. received, adding to KAFKA queque');
            res.status(200).send({ response: '200, Received'});
            
            let record = {
              userId: '9438jd',
              data: JSON.stringify(req.body),
              sessionId: 'i23d',
              type: 'blb'
            };

            KafkaService.sendRecord(
                record, (err, response) => {
              if(err)console.log('service err: ', err);
              console.log('\n\nKafka response:', response, '\n\n');
             }
           );

           // Kafka Consumer Here.
           // Should it be part of the System?          

        });
        app.use('/api', apiRoutes);
};
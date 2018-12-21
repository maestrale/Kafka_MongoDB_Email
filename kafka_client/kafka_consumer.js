const express = require('express');
const app = express();

const port=3004;
const server = app.listen(port);
console.log(`Kafka Consumer server is running on port ${port}.`);
console.log('\nWaiting for Events...\n');
let kafka=require('kafka-node');
// // used to have http:// in the address 
const client = new kafka.Client("localhost:2181");
 
const topics = [
    {
        topic: "webevents.dev"
    }
];
const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "buffer"
};

 
const consumer = new kafka.HighLevelConsumer(client, topics, options);
 
consumer.on("message", function(message) {
 
    // Read string into a buffer.
    var buf = new Buffer(message.value, "binary"); 
    var decodedMessage = JSON.parse(buf.toString());
    
    console.log('\n\n', 'Kafka Log:');
    console.log('\n\n',decodedMessage.data);
    console.log('\n\nThe data above is the data field of the Kafka event');
    console.log('\n\nEvent id:',decodedMessage.id);
});
 
consumer.on("error", function(err) {
    console.log("error", err);
});
 
process.on("SIGINT", function() {
    consumer.close(true, function() {
        process.exit();
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', err);
});

module.exports = server;
let kafka=require('kafka-node');
let uuid=require('uuid');
 
// used to have http:// in the address
const client = new kafka.Client("localhost:2181", "my-client-id", {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});
const producer = new kafka.HighLevelProducer(client);

// For this demo we just log producer errors to the console.
producer.on("error", function(error) {
    console.error('error log: ', error);
});

const KafkaService = {
    sendRecord: ({ type, userId, sessionId, data }, callback = () => {}) => {
        producer.on("ready", function() {
            console.log("Kafka Producer is connected and ready.");
        });
        if (!userId) {
            return callback(new Error(`A userId must be provided.`));
        }
        const event = {
            id: uuid.v4(),
            timestamp: Date.now(),
            userId: userId,
            sessionId: sessionId,
            type: type,
            data: data
        };
        const buffer = new Buffer.from(JSON.stringify(event));
        // Create a new payload
        const record = [
            {
                topic: "webevents.dev",
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];
        //Send record to Kafka and log result/error
        producer.send(record, callback);
    }
};

 
module.exports=KafkaService;
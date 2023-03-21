
const myTopic ="gruppe21";

// --- RECEIVING MESSAGE --------------------------------------
client.on('message', function(topic, message) 
{
 let msg=JSON.parse(message)
 if('size' in msg) size = msg.size
 if('color' in msg) color = msg.color
 // do your thing here when a message arrives--------
});

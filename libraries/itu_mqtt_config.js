// --- SETTING UP --------------------------------------
//const myBroker = "wss://edp21:Ko5z2bU0Uf7ajNzv@edp21.cloud.shiftr.io";
const myBroker = "wss://edp22:JlTwNIbtNIwZk0IA@edp22.cloud.shiftr.io";

const myID = "itu" + parseInt(Math.random() * 10000000, 10);
const client = mqtt.connect(myBroker, {clientId: myID});

// --- CONNECTING--------------------------------------
client.on('connect', function() {
  console.log('connected!');
  client.subscribe(myTopic)
  console.log(myTopic)
});



// --- SEND MESSAGE --------------------------------------
function sendMessage(msg)
{
  let JSONmsg = JSON.stringify(msg);
  client.publish(myTopic, JSONmsg);
}

const amqp=require("amqplib")

//producer wont make any queqque or bind

//consumer will do it

async function sendMail(routingKey,message) {
    try{
    const connection = await amqp.connect("amqp://localhost")
    const channel=await connection.createChannel()
    //for producer we need chaannel

    const exchange="notification_exchange";
    const exchangeType="topic";

    //create exchange

    await channel.assertExchange(exchange,exchangeType,{durable:false});
      //producer will send data on exchange 
    //message is sent in buffer
    channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)));
    console.log("sent '%s':'%s'",routingKey,JSON.stringify(message))

    //we need to close connection as well

    setTimeout(function() {
        connection.close();
        console.log('This message will be logged after 2 seconds.');
    }, 2000); // 2000 milliseconds = 2 seconds
    

}
    catch(err){
      console.log(err)
    }
    
}

sendMail("order.placed",{
    orderid:"12344556",
 adddrs:"123@123.com"
});

sendMail("payment.process",{
    paymentGW:"Gpay",
 adddrs:"123@123.com"
});

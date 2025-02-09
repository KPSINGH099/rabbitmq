const amqp=require("amqplib")

//using more than one queque

async function sendMail(params) {
    try{
    const connection = await amqp.connect("amqp://localhost")
    const channel=await connection.createChannel()
    //for producer we need chaannel

    const exchange="mail_exchange_multi_consumer";
    const routingkeySubscribed="subscribed_send_mail";
    const routingkeyUser="user_send_mail";

    const message={
        to:"abc@abc.com",
        from:"123@123.com",
        subject :"hello"
    }


    //create exchange

    await channel.assertExchange(exchange,"direct",{durable:false});
    
    //initializing queque with name
    await channel.assertQueue("subscribed_queque",{durable:false})

    await channel.assertQueue("user_queque",{durable:false})
  
    //connection between exchange and queque

    //bind exchange with queq

    await channel.bindQueue("subscribed_queque",exchange,routingkeySubscribed);

    await channel.bindQueue("user_queque",exchange,routingkeyUser);


    //producer will send data on exchange 
    //message is sent in buffer
    channel.publish(exchange,routingkeySubscribed,Buffer.from(JSON.stringify(message)));

    channel.publish(exchange,routingkeyUser,Buffer.from(JSON.stringify(message)));

    console.log("message sent",message);

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
sendMail();

const amqp=require("amqplib")

async function sendMail(params) {
    try{
    const connection = await amqp.connect("amqp://localhost")
    const channel=await connection.createChannel()
    //for producer we need chaannel

    const exchange="mail_exchange";
    const routingHey="send_mail";

    const message={
        to:"abc@abc.com",
        from:"123@123.com",
        subject :"hello"
    }


    //create exchange

    await channel.assertExchange(exchange,"direct",{durable:false});
    
    //create queque
    await channel.assertQueue("mail_queque",{durable:false})
  
    //connection between exchange and queque

    //bind exchange with queq

    await channel.bindQueue("mail_queque",exchange,routingHey);


    //producer will send data on exchange 
    //message is sent in buffer
    channel.publish(exchange,routingHey,Buffer.from(JSON.stringify(message)));

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


//durable false----if server stopped then data is not saved under disk'
//durable true ------data saved under queq
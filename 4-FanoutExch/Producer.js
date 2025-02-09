const amqp=require("amqplib")

//producer wont make any queqque or bind

//consumer will do it

async function sendMail(message) {
    try{
    const connection = await amqp.connect("amqp://localhost")
    const channel=await connection.createChannel()
    //for producer we need chaannel

    const exchange="new_product_launch";
    const exchangeType="fanout";

    //create exchange

    await channel.assertExchange(exchange,exchangeType,{durable:false});
      //producer will send data on exchange 
    //message is sent in buffer
    channel.publish(exchange," ",Buffer.from(JSON.stringify(message)),{persistent:true});
    console.log("sent '%s':'%s'",exchange,JSON.stringify(message))

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

sendMail({
    piid:"12344556",
 PName:"Iphone black"
});



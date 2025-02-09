const amqp=require("amqplib")
//producer and consumer should be using same exchange
async function recieveMail(params) {
    try{
        const connection = await amqp.connect("amqp://localhost")
        const channel=await connection.createChannel()

        const exchange="notification_exchange";
        const queq="payment_queq";
        
        
       await channel.assertExchange(exchange,"topic",{durable:false});
    
        //assering q
        await channel.assertQueue(queq,{durable:false})
      
        await channel.bindQueue(queq,exchange,"payment.*")
        channel.consume(queq,(msg)=>{
            if (msg!=null){
                console.log("message for Normal user ",JSON.parse(msg.content))

                //once msg is recieved send acknwoldment to rabbitmq
                //and msg will be clear to queq

                channel.ack(msg);
            }
         
        })
    }
    catch(err){
        console.log("errr",err)
    }
}

recieveMail();

console.log("hiiiii")
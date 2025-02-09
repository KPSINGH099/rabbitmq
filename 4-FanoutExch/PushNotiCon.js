const amqp=require("amqplib")
//producer and consumer should be using same exchange
async function recieveMail(params) {
    try{
        const connection = await amqp.connect("amqp://localhost")
        const channel=await connection.createChannel()

        const exchange="new_product_launch";

       const exchangeType="fanout"
        
        
        
       await channel.assertExchange(exchange,exchangeType,{durable:false});
    
        //once message is recieved delete que
        const queq=await channel.assertQueue("",{exclusive:true})

        console.log("waiting ==>",queq)

        await channel.bindQueue(queq.queue,exchange,"")
      
      
        channel.consume(queq.queue,(msg)=>{
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
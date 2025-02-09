const amqp=require("amqplib")

async function recieveMail(params) {
    try{
        const connection = await amqp.connect("amqp://localhost")
        const channel=await connection.createChannel()

        //assering q
        await channel.assertQueue("subscribed_queque",{durable:false})

        channel.consume("subscribed_queque",(msg)=>{
            if (msg!=null){
                console.log("message for sub user ",JSON.parse(msg.content))

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
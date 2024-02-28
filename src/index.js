// Require the necessary discord.js classes
// Run with the command "nodemon" 
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.on('messageCreate', msg => {
    if(msg.author.displayName != client.user.displayName){
        if (msg.content.substring(0, 1) == '!') {
            args = msg.content.substring(1);
            if ( args == 'help'){
                msg.reply(
                    'Commands: !hx für Hexxen Würfel \n'+
                    'Commands: !jx für Janus Würfel\n'+
                    'Commands: !bx für Blutungs Würfel\n'+
                    'Commands: !ex für Elexier Würfel\n'+
                    'Commands: !sx für Segnungs Würfel\n'+
                    'Commands können verkettet werden also "!hx jy ez"\n'+
                    'Wird die Anzahl weckgelassen wird nur ein Würfel gerollt'                
                   );
            }else {   
            var command = args.split(' ');
            var reply = constructMessage(command);
            msg.reply(reply);
            }
    
        }
    }
});


function constructMessage(message){
    var reply = ' ';
       for (let i = 0; i < message.length; i++){
           var d_count = Number(message[i].substring(1));
           if(message[i].substring(0, 1) == 'h'){
               reply = reply + 'Hexxenwürfel:  |';
               if(message[i].length == 1){
                    reply = reply + getHexxenDice(rollDice()) + ' |';
               }else {
                    for(let i = 0; i< d_count; i++ ){
                        reply = reply + getHexxenDice(rollDice()) + ' |';
                    }
               }

           } else if(message[i].substring(0, 1) == 'j'){
               reply = reply + 'Januswürfel:   |';
               if(message[i].length == 1){
                    reply = reply + getJanusDice(rollDice()) + ' |';
               }else {
                    for(let i = 0; i< d_count; i++ ){
                        reply = reply + getJanusDice(rollDice()) + ' |';
                    }
               }    
               
   
           } else if(message[i].substring(0, 1) == 'b'){
               reply = reply + 'Blutungswürfel: |';
               if(message[i].length == 1){
                    reply = reply + getBlutDice(rollDice()) + ' |';
               }else {
                    for(let i = 0; i< d_count; i++ ){
                        reply = reply + getBlutDice(rollDice()) + ' |';
                    }
               }

   
           } else if(message[i].substring(0, 1) == 'e'){
               reply = reply + 'Elexierwürfel:  |';
               if(message[i].length == 1){
                    reply = reply + getElixierDice(rollDice()) + ' |'; 
               }else {
                    for(let i = 0; i< d_count; i++ ){
                        reply = reply + getElixierDice(rollDice()) + ' |';
                    }
               }

   
           } else if(message[i].substring(0, 1) == 's'){
               reply = reply + 'Segnungswürfel: |';
               if(message[i].length == 1){
                    reply = reply + getSegnungsDice(rollDice()) + ' |'; 
               }else {
                    for(let i = 0; i< d_count; i++ ){
                        reply = reply + getSegnungsDice(rollDice()) + ' |';
                    }
               }

   
           }
           reply = reply + '\n';
   
       }
       console.log(reply);
       return reply;  
}
   
   
function getHexxenDice(d_result){
   if(d_result == 1){
       return ' :star:';
    } else if(d_result == 2 || d_result  == 3 || d_result == 4){
       return ' :green_square:';
   } else if(d_result == 5 || d_result == 6){
       return ' :black_bird:';
   } else {
       return 'x';
   }
   
}
   
   
function getJanusDice(d_result){
   
   if(d_result < 4){
       return ' :white_large_square:';
   } else if(d_result > 3){
       return ' :skull:';
   } else {
       return ' '
   }
}
   
function getBlutDice(d_result){
   if(d_result == 1){
       return ' :red_square:';
   } else if(d_result == 2 || d_result == 3){
       return ' :drop_of_blood:';
   } else if(d_result == 4 || d_result == 5){
       return ' :drop_of_blood::drop_of_blood:';
   } else if(d_result == 6){
       return ' :drop_of_blood::drop_of_blood::drop_of_blood:';          
   } else {
       return ' ';
   }
}
   
function getElixierDice(d_result){
   if(d_result == 1){
       return ' :one:';
   } else if(d_result == 2){
       return ' :two:';
   } else if(d_result == 3 || d_result == 4){
       return ' :three:';
   } else if(d_result == 5){
       return ' :four:';          
   } else if(d_result == 6){
       return ' :five:';
   } else {
       return '';
   }
}
   
function getSegnungsDice(d_result){
   if(d_result == 1 || d_result == 2){
       return ' :star:';
   } else if(d_result == 3){
       return ' :green_square:';
   } else if(d_result == 4 || d_result == 5){
       return ' :black_bird:';
   } else if(d_result == 6){
       return ' :black_bird::black_bird:';          
   } else {
       return ' ';
   }
}
   
   
function rollDice(){
   var result = Math.floor(Math.random() * 6) + 1;
   return result;
}

//put your Discord bot Token into config.json
client.login(token);









const Discord = require ('discord.js');
const bot = new Discord.Client();
const fs = require("fs");

clientInformation.commands = new Discord.Collection();
clientInformation.alliases = new Discord.Collection();

client.categories = fs.addirSync("./commands/");

bot.login(process.env.token);

const PREFIX = 'h!';

bot.on('ready', () =>{
    console.log('Roger, Hibiki, heading out.');
    
    client.user.setPresence({
        status: "online",
        game: {
            name: "h!help",
            type: "STREAMING"
        }
    });
});

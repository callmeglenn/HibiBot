const Discord = require ('discord.js');
const bot = new Discord.Client();

const cheerio = require('cheerio');

const request = require('request');

bot.login(process.env.token);

const PREFIX = 'h!';

bot.on('ready', () =>{
    console.log('Roger, Hibiki, heading out.');
    bot.user.setActivity('h!pic', { type: 'PLAYING'}).catch(console.error);

})

module.exports.run = async (bot, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
            .setAuthor('Commander, your orders please.')
            .setDescription('```help | pic```')
            .addFields({ name: 'Prefix', value: '```h!```', inline: true})
            .setColor('#00FFF3')
    }
    let command = helpArgs[0];

    if(bot.commands.has(command)) {
        
        command = bot.commands.get(command);
        var embed = new Discord.MessageEmbed()
        .setAuthor(`${command.config.name} Command`)
        .setDescription(`
        - **Command's Description** __${command.config.description || "There is no Description for this command."}__
        - **Command's Usage:** __${command.config.usage || "No Usage"}__
        - **Command's Permissions:** __${command.config.accessableby || "Members"}__
        - **Command's Aliases:** __${command.config.aliases || "No Aliases"}__
        `)
        .setColor('#2EFF00')

    message.channel.send(embed);
}}    


bot.on('message', message => {
 
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
        case 'pic':
        image(message);
 
        break;
    }
 
});
 

function image(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "Hibiki (Kantai Collection)",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 
 
 
 
 
 
}
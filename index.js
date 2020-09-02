const Discord = require ('discord.js');
const bot = new Discord.Client();

const cheerio = require('cheerio');

const request = require('request');

bot.login(process.env.token);

const PREFIX = 'h!';

bot.on('ready', () =>{
    console.log('Roger, Hibiki, heading out.');
    if (config.activity.streaming == true) {
        bot.user.setActivity(config.activity.game, {url: 'https://twitch.tv/HibikiSpring'});
      } else {
        bot.user.setActivity(config.activity.game, {type: 'PLAYING'});//PLAYING, LISTENING, WATCHING
        bot.user.setStatus('online'); // dnd, idle, online, invisible
      }
    });

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
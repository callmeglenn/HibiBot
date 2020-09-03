const Discord = require('discord.js');
const botsettings = require('./botsettings.json');
const cheerio = require('cheerio');
const request = require('request');
const prefix = `h!`;
const appearanceResponses = ["Wears a similar serafuku to the rest of her class with an anchor emblem on the chest.", "She and Akatsuki wear navy hats that also bear an anchor emblem.", "She has bleached hair that is slightly disheveled, in a similar manner to her sisters.", "Another trait shared with her sisters is the matching colour of her eyes and hair."];
const personalityResponses = ["Characterized in the anime by her vacant attitude and expression.", "A calm and stoic Russophile who tends to include Russian words in her speech. As Верный, she speaks more Russian.", "However, as revealed in the 4-koma, her vocabulary in Russian is noted to be rather limited, as Fubuki tries to hold a conversation with her in Russian, only for Verniy to panic and say that it would be better for them to converse in Japanese instead."]
const triviaResponses = ["Hibiki means echo, Верный (Verniy) means loyal and her final name, Декабрист (Dekabrist) is a tribute to the Decembrist revolt.", "Hibiki was first carried by the twenty-first ship of the first Kamikaze class in 1906.", "Верный was first carried by a submarine class in the old USSR.", "Hibiki's present incarnation exists as the lead ship of Hibiki-class Ocean Surveillance Ship, AOS-5201 JDS Hibiki of Japan Maritime Self-Defense Force.", "Received her Kai Ni (Верный) on 11/09/2013.", "Shunsaku Kudō was transferred to Hibiki after his humanitarian rescue of enemy personnel while captain of Ikazuchi.", "She was retired from service on February 20 1953 and sunk as a target by the Soviet Naval Aviation team sometime in the 1970's at Karamzina Island near Vladivostok.", "After being discovered in 2012, her wreckage is now a popular diving site. Seasonal diving tours to her wreckage are available."];

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`Roger, ${bot.user.username}, heading out.`);
    if (botsettings.activity.streaming == true) {
        bot.user.setActivity(botsettings.activity.game, {type: 'STREAMING', url: 'https://twitch.tv/HibikiSpring'});
    } else {  
      bot.user.setActivity(botsettings.activity.game, {type: 'WATCHING'}); // PLAYING, LISTENING, WATCHING
    }
});

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

// Hibiki & Verniy KanColle: Kantai Collecton images
bot.on('message', message => {
 
    let args = message.content.substring(prefix.length).split(" ");
 
    switch (args[0]) {
        case 'hibikikc':
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

bot.on('message', message => {
 
    let args = message.content.substring(prefix.length).split(" ");
 
    switch (args[0]) {
        case 'verniykc':
        image(message);
 
        break;
    }
 
});
 
function image(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "Verniy (Kantai Collection)",
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

bot.on('message', message => {
 
    let args = message.content.substring(prefix.length).split(" ");
 
    switch (args[0]) {
        case 'hibiki':
        image(message);
 
        break;
    }
 
});
 
function image(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "Hibiki (KanColle)",
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

bot.on('message', message => {
 
    let args = message.content.substring(prefix.length).split(" ");
 
    switch (args[0]) {
        case 'verniy':
        image(message);
 
        break;
    }
 
});
 
function image(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "Verniy (KanColle)",
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

// Hibiki's Appearance
bot.on('message', function (message) {
    // It is considered bad practice to let your bot react to other bots.
    if (message.author.bot) return;

    // If a message doesn't start with your bot's prefix, don't bother going through the cases.
    if (!message.content.startsWith("h!")) return;

    // Args length check. #1 is the command, #2 and higher are the arguments
    var args = message.content.substring("h!".length).split(" ");

    switch (args[0].toLowerCase()) {
        case "appearance":
            var response = appearanceResponses [Math.floor(Math.random()*appearanceResponses .length)];

            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
});

// Hibiki's Personality
bot.on('message', function (message) {
    // It is considered bad practice to let your bot react to other bots.
    if (message.author.bot) return;

    // If a message doesn't start with your bot's prefix, don't bother going through the cases.
    if (!message.content.startsWith("h!")) return;

    // Args length check. #1 is the command, #2 and higher are the arguments
    var args = message.content.substring("h!".length).split(" ");

    switch (args[0].toLowerCase()) {
        case "personality":
            var response = personalityResponses [Math.floor(Math.random()*personalityResponses .length)];

            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
});

bot.on('message', function (message) {
    // It is considered bad practice to let your bot react to other bots.
    if (message.author.bot) return;

    // If a message doesn't start with your bot's prefix, don't bother going through the cases.
    if (!message.content.startsWith("h!")) return;

    // Args length check. #1 is the command, #2 and higher are the arguments
    var args = message.content.substring("h!".length).split(" ");

    switch (args[0].toLowerCase()) {
        case "looks":
            var response = appearanceResponses [Math.floor(Math.random()*appearanceResponses .length)];

            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
});

// Hibiki's Trivia
bot.on('message', function (message) {
    // It is considered bad practice to let your bot react to other bots.
    if (message.author.bot) return;

    // If a message doesn't start with your bot's prefix, don't bother going through the cases.
    if (!message.content.startsWith("h!")) return;

    // Args length check. #1 is the command, #2 and higher are the arguments
    var args = message.content.substring("h!".length).split(" ");

    switch (args[0].toLowerCase()) {
        case "trivia":
            var response = triviaResponses [Math.floor(Math.random()*triviaResponses .length)];

            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
});

bot.login(botsettings.token);
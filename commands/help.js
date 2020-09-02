const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if(helpArgs[0] === 'Info') {
        return message.reply("I'm Hibiki. I'm also referred to as The Phoenix from my exploits.")
    }

    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
        .setAuthor(`Commander, your orders please.`)
        .setDescription('````help | info | pic````')
        .addFields({ name: 'Prefix', value: '```h!```', inline: true})
        .setColor('#00FFF3')
    }

    if(helpArgs[0]) {
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
}

module.exports.config = {
    name: "help",
    description: "",
    usage: "h!help",
    accessableby: "Members",
    aliases: []
}
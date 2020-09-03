const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('Here is the Available Commands to use:')
        .setURL('http://invite.gg/Hibiki')
        .setAuthor('Commander, your orders please.')
        .setDescription('These commands will have different image results.')
        .setColor('#00FFF3')
        .setFooter('HibiBot by Hibiki#2879')
        .addFields(
            { name: 'Hibiki (KanColle)', value: 'h!hibiki', inline: true},
            { name: 'Verniy (KanColle)', value: 'h!verniy', inline: true},
            { name: 'Hibiki (Kantai Collection)', value: 'h!hibikikc'},
            { name: 'Verniy (Kantai Collection)', value: 'h!verniykc'}
        )
        .setTimestamp()


    message.channel.send(embed);
}

module.exports.config = {
        name: "image",
        description: "Get a random Hibiki/Verniy from Kancolle: Kantai Collection image on Google.",
        usage: "h!image",
        accessableby: "Members",
        aliases: [`img`]
    }
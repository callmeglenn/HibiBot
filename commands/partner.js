const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('Here is the current partnership list:')
        .setURL('http://invite.gg/Hibiki')
        .setAuthor('Commander, your orders please.')
        .setDescription('These are our partnership.')
        .setColor('#eebbee')
        .setFooter('HibiBot by Hibiki#2879')
        .addFields(
            { name: 'Name', value: 'Link'},
            { name: 'Name', value: 'Link'}
        )
        .setTimestamp()


    message.channel.send(embed);
}

module.exports.config = {
    name: "partner",
    description: "A look of partnership between Hibiki Academy and others",
    usage: "h!partner",
    accessableby: "Members",
    aliases: [`partner`]
}
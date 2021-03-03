const { MessageEmbed } = require('discord.js')
const config = require('../config')
module.exports = async function(client, message) {
    const channel = client.channels.cache.get(config.logId)
    if (!channel) return
    if (!message.content) return
    if (message.author.bot) return

    const embed = new MessageEmbed().setColor('RED')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`Deleted in ${message.channel}`)
    .addField("Message", message.content)
    return channel.send(embed)
}
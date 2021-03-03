const { MessageEmbed } = require("discord.js")
const config = require('../config')
module.exports = async function(client, oldMessage, newMessage) {
    const channel = client.channels.cache.get(config.logId)
    if (oldMessage.deleted) return
    if (!channel) return
    if (oldMessage.author.bot) return
    
    const embed = new MessageEmbed().setColor('ORANGE')
    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`Edited in ${oldMessage.channel}`)
    .addField("Old Message", oldMessage.content, true)
    .addField("New Message", newMessage.content, true)
    return channel.send(embed)
}
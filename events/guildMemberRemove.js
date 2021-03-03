const { MessageEmbed } = require('discord.js')
const config = require('../config')
module.exports = async function(client, member) {
    const channel = client.channels.cache.get(config.logId)
    if (!channel) return

    const embed = new MessageEmbed()
    .setColor('RED')
    .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic:true}))
    .setDescription(`${member} left the server, there are **${member.guild.memberCount}** members now`)
    return channel.send(embed)
}
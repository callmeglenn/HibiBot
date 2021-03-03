const { MessageEmbed } = require('discord.js')
const MongoLevel = require('../../library/MongoLevel')
module.exports = {
    name: 'deletelevel',
    minArgs: 1,
    expectedArgs: '<level>',
    owner: true,
    category: "owner",
    run: async function(message, args) {
        const { channel, guild } = message
        const embed = new MessageEmbed().setColor('RED')
        
        const number = Math.floor(args[0])
        if (isNaN(number)) return channel.send(embed.setDescription(`**${args[0]}** is an invalid number`))

        await new MongoLevel(guild.id).delete(number)
        return channel.send(embed.setDescription(`Members who reach level **${number}** won't get anything`))
    }
}
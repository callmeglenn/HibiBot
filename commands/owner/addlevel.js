const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const MongoLevel = require('../../library/MongoLevel')
module.exports = {
    name: 'addlevel',
    minArgs: 2,
    expectedArgs: '<level> <@&role>',
    owner: true,
    description: "Adds a new level role",
    category: "owner",
    run: async function(message, args) {
        const { channel, guild } = message
        const embed = new MessageEmbed().setColor('RED')
        
        const number = Math.floor(args[0])
        if (isNaN(number)) return channel.send(embed.setDescription(`**${args[0]}** is an invalid number`))
        
        if (args[1].startsWith('<@&') && args[1].endsWith('>')) args[1] = args[1].replace(/\D/g, '')
        const role = guild.roles.cache.find(r => [r.id, r.name].includes(args[1]))
        if (!role) return channel.send(embed.setDescription(`**${args[1]}** is an invalid role`))

        await new MongoLevel(guild.id).add(role.id, number)
        return channel.send(embed.setDescription(`From now on, anyone who reaches level **${number}** will get ${role}\nWant to delete levelroles? Use \`${config.prefix}deletelevel <level>\``).setColor('GREEN'))
    }
}
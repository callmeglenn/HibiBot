const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'purge',
    description: "Purges the number of messages in the channel",
    minArgs: 1,
    expectedArgs: '<number>',
    permissions: 'MANAGE_MESSAGES',
    category: 'mod',
    run: async function(message, args) {
        const { channel } = message
        const number = Math.floor(args[0])
        const embed = new MessageEmbed().setColor('RED')
        if (isNaN(number)) return channel.send(embed.setDescription(`**${args[0]}** is an invalid number`))
        if (number < 2 || number > 100) return channel.send(embed.setDescription(`You can only delete messages from **2** to **100**`))

        const messages = await channel.bulkDelete(number)
        const msg = await channel.send(embed.setDescription(`Successfully purged **${messages.size}** messages`).setColor('GREEN'))
        setTimeout(() => msg.delete(), 5000)
    }
}
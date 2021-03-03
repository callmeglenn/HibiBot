const { MessageEmbed } = require("discord.js")
const MongoGuild = require('../../library/MongoGuild')
module.exports = {
    name: 'bot',
    aliases: ['bots'],
    description: "Enable/Disable stats for tracking all bots",
    owner: true,
    category: "owner",
    run: async function(message) {
        const embed = new MessageEmbed().setColor('RED')
        const { channel, guild } = message
        const database = await new MongoGuild(guild.id).get()
        const { bots } = database
        if (!bots.enabled) {
            const members = (await guild.members.fetch()).filter(m => m.user.bot)

            const ch = await guild.channels.create(`Bots: ${members.size}`, { type: 'voice', permissionOverwrites: [{ id: guild.id, deny: ['CONNECT'] }] })
            await new MongoGuild(guild.id).bot(ch.id, true)
            return channel.send(embed.setTitle(`Enabled server tracking for bots`).setColor('GREEN'))
        }
        const ch = guild.channels.cache.get(bots.channelId)
        if (ch) ch.delete()
        await new MongoGuild(guild.id).bot('', false)
        return channel.send(embed.setTitle(`Disabled server tracking for bots`))
    }
}
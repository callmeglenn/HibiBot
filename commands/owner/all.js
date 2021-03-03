const { MessageEmbed } = require("discord.js")
const MongoGuild = require('../../library/MongoGuild')
module.exports = {
    name: 'all',
    description: "Enable/Disable stats for tracking all members",
    owner: true,
    category: "owner",
    run: async function (message) {
        const embed = new MessageEmbed().setColor('RED')
        const { channel, guild } = message
        const database = await new MongoGuild(guild.id).get()
        const { all } = database
        if (!all.enabled) {
            const ch = await guild.channels.create(`All Members: ${guild.memberCount}`, { type: 'voice', permissionOverwrites: [{ id: guild.id, deny: ['CONNECT'] }] })
            await new MongoGuild(guild.id).all(ch.id, true)
            return channel.send(embed.setTitle(`Enabled server tracking for all members`).setColor('GREEN'))
        }
        const ch = guild.channels.cache.get(all.channelId)
        if (ch) ch.delete()
        await new MongoGuild(guild.id).all('', false)
        return channel.send(embed.setTitle(`Disabled server tracking for all members`))
    }
}
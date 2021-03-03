const { MessageEmbed } = require("discord.js")
const MongoGuild = require('../../library/MongoGuild')
module.exports = {
    name: 'human',
    aliases: ['humans'],
    description: "Enable/Disable stats for tracking all humans",
    owner: true,
    category: "owner",
    run: async function(message) {
        const embed = new MessageEmbed().setColor('RED')
        const { channel, guild } = message
        const database = await new MongoGuild(guild.id).get()
        const { humans } = database
        if (!humans.enabled) {
            const members = (await guild.members.fetch()).filter(m => !m.user.bot)

            const ch = await guild.channels.create(`Members: ${members.size}`, { type: 'voice', permissionOverwrites: [{ id: guild.id, deny: ['CONNECT'] }] })
            await new MongoGuild(guild.id).human(ch.id, true)
            return channel.send(embed.setTitle(`Enabled server tracking for humans`).setColor('GREEN'))
        }
        const ch = guild.channels.cache.get(humans.channelId)
        if (ch) ch.delete()
        await new MongoGuild(guild.id).human('', false)
        return channel.send(embed.setTitle(`Disabled server tracking for humans`))
    }
}
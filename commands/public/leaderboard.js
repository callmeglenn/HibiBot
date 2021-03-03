const { MessageEmbed } = require('discord.js')
const MongoUser = require('../../library/MongoUser')
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: "Displays the top 10 ranking members in the server",
    category: 'public',
    run: async function (message) {
        const { guild, channel } = message
        const embed = new MessageEmbed().setColor('ORANGE').setTitle('Top 10')
        const data = await new MongoUser(guild.id).all()
        if (!data.length) return channel.send(embed.setDescription(`There isn't anyone in the leaderboards right now, start typing!`))

        const members = data.slice(0, 10)
        members.sort((b, a) => (a.xp + (a.level * 100)) - (b.xp + (b.level * 100)))
        for (i = 0; i < members.length; i++) members.splice(i, 1, `**${i + 1}.** <@${members[i].userId}>\nLevel **${members[i].level}**`)
        return channel.send(embed.setDescription(members.join('\n\n')))
    }
}
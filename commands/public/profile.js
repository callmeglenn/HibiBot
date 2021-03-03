const { MessageEmbed } = require('discord.js')
const MogoUser = require('../../library/MongoUser')
const config = require('../../config')
module.exports = {
    name: 'profile',
    description: "Displays the user's level",
    category: 'public',
    run: async function(message, args) {
        const { channel, member: me, guild } = message
        let member = me
        if (args.length) {
            if (args[0].startsWith('<@') && args[0].endsWith('>')) args[0] = args[0].replace(/\D/g, '')
            member = await guild.members.fetch(args[0]).catch(()=>{return})
            if (!member) member = me
        }
        const data = await new MogoUser(guild.id, member.id).get()
        const embed = new MessageEmbed()
        .setColor('ORANGE').setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic:true}))
        .addField("Level", data.level || 0, true)
        .addField("XP", `${data.xp} / ${config.level.base + (data.level * config.level.multiplier)}`, true)
        return channel.send(embed)
    }
}
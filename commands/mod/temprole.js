const ms = require('ms')
const humanizeDuration = require('humanize-duration')
const MongoTempRole = require('../../library/MongoTempRole')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'temprole',
    description: "Temporarily awards someone a role which will be removed after time is up, duration will increased if used again",
    minArgs: 3,
    expectedArgs: '<@member/id> <duration> <@&role>',
    permissions: 'MANAGE_ROLES',
    category: 'mod',
    run: async function(message, args) {
        const { guild, channel } = message
        const embed = new MessageEmbed().setColor('RED')

        if (args[0].startsWith('<@') && args[0].endsWith('>')) args[0] = args[0].replace(/\D/g, '')
        const member = await guild.members.fetch(args[0]).catch(()=>{return})
        if (!member) return channel.send(embed.setDescription(`**${args[0]}** is not a valid server member`))

        const time = args[1].toLowerCase()
        const validTime = /^\d+(s|m|h|d)$/
        if (!validTime.test(time)) return channel.send(embed.setDescription(`**${time}** is an invalid time format \`Example: 3600s, 60m, 1h\``))
        const duration = ms(time)
        if (duration < ms('30s')) return channel.send(embed.setDescription(`Due to ratelimit reasons, the short amount of time that I can set for a temprole is **30 seconds**`))
        
        if (args[2].startsWith('<@&') && args[2].endsWith('>')) args[2] = args[2].replace(/\D/g, '')
        const role = guild.roles.cache.find(r => [r.id, r.name].includes(args[2]))
        if (!role) return channel.send(`**${args[2]}** is an invalid role`)
        if (role.position >= guild.me.roles.highest.position) return channel.send(embed.setDescription(`I can't give a role that is higher than my highest role!`))

        const temprole = new MongoTempRole(guild.id, member.id)
        const data = await temprole.get.byRole(role.id)

        const now = data ? data.end : Date.now()
        const end = now + duration

        embed.setColor('GREEN')
        await temprole.add(role.id, end)
        if (!member.roles.cache.get(role.id)) await member.roles.add(role.id)
        
        if (data) return channel.send(embed.setDescription(`${member} has been granted an additional **${humanizeDuration(duration, { largest: 2, round: true, conjunction: ', and ' })}** for the ${role} role`))
        else return channel.send(embed.setDescription(`${member} has been granted the ${role} role for **${humanizeDuration(duration, { largest: 2, round: true, conjunction: ', and '})}**`))
    }
}
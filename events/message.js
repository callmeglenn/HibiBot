const Discord = require('discord.js')
const ratelimits = new Map()
const humanizeDuration = require('humanize-duration')
module.exports = async function (client, message) {
    const {
        author,
        member,
        content,
        channel,
        guild 
    } = message
    if (author.bot) return

    const { prefix } = client.config
    if (!content.startsWith(prefix)) return

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setFooter(`Requested by ${author.tag}`, author.displayAvatarURL({ dynamic: true }))

    const arguments = content.substr(content.indexOf(prefix) + prefix.length).split(new RegExp(/\s+/))
    const name = arguments.shift().toLowerCase()
    const command = await client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))
    if (!command) return

    const ratelimit = ratelimits.get(author.id)
    if (ratelimit) return channel.send(embed.setDescription(`You are being ratelimited! Please wait for **${humanizeDuration(ratelimit - Date.now())}**`))
    ratelimits.set(author.id, Date.now() + 1000)
    setTimeout(() => ratelimits.delete(author.id), 1000)

    if (guild) {
        // Permissions
        if (command.permissions) {
            if (typeof command.permissions == 'string') command.permissions = [command.permissions]
            for (const permission of command.permissions) if (!member.permissions.has(permission)) return channel.send(member, embed.setDescription(`You do not have the permission \`${permission}\` to use this command`))
        }
        // Guild Owner
        if (command.owner && member.id !== guild.ownerID) return
    }
    if (!guild) {
        // DM-Allowed
        if (!command.dm) return
    }

    // Client Owner
    if (command.client) {
        const { owner } = await client.fetchApplication()
        if (owner.id !== author.id) return
    }

    // Arguments
    if (command.minArgs && arguments.length < command.minArgs || command.maxArgs && arguments.length > command.maxArgs)
        return channel.send(member, { embed: { color: 'RED', description: `**Arguments**\n\`${prefix}${name} ${command.expectedArgs}\`` } })
    command.run(message, arguments)
}
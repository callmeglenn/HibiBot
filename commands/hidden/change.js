const { MessageEmbed } = require('discord.js')
const MongoUser = require('../../library/MongoUser')
module.exports = {
    name: 'change',
    description: "Changes the color of their role",
    hidden: true,
    run: async function (message, args) {
        const mongo = new MongoUser(message.guild.id, message.author.id)
        const data = await mongo.get()
        if (!data.color_role.roleId || !args.length) return

        const color = args[0].toLowerCase() == 'null' ? '' : args[0]
        if (args[0].toLowerCase() !== 'null') {
            const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`Your role color has changed to **${color}**`)
            message.channel.send(embed)
        }
        else {
            const embed = new MessageEmbed()
            .setDescription("Removed the color from your role")
            message.channel.send(embed)
        }

        let role = message.guild.roles.cache.get(data.color_role.roleId)
        if (!role) {
            const position = message.member.roles.highest.position > message.guild.me.roles.highest.position ?
                message.guild.me.roles.highest.position : message.member.roles.highest.position
            role = await message.guild.roles.create({ data: { name: message.author.id, position, color: color.length ? color : 'wdd' } })
            message.member.roles.add(role.id)
            return await mongo.cr.create(role.id, color)
        }
        if (role) {
            role.setColor(color.length ? color : 'wdd')
            if (!message.member.roles.cache.get(role.id)) message.member.roles.add(role.id)
            return await mongo.cr.update.hex(color)
        }
    }
}
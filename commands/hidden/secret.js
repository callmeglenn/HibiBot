const MongoUser = require('../../library/MongoUser')
module.exports = {
    name: 'secret',
    description: "Get a random characteristic of Hibiki.",
    accessableby: "Members",
    hidden: true,
    run: async function (message) {
        message.delete()
        const position = message.member.roles.highest.position > message.guild.me.roles.highest.position ?
        message.guild.me.roles.highest.position : message.member.roles.highest.position

        const mongo = new MongoUser(message.guild.id, message.author.id)
        const data = await mongo.get()
        if (!data.color_role.roleId.length) {
            const role = await message.guild.roles.create({ data: { name: message.author.id, position } })
            await message.member.roles.add(role.id)
            await mongo.cr.create(role.id, '')
            return message.member.send(`Ура! You found the secret command and was awarded your very own color role! You can change the color of this role by using the \`${message.client.config.prefix}change <hex>\` command`)
        }
        else {
            let role = message.guild.roles.cache.get(data.color_role.roleId)
            if (!role) {
                role = await message.guild.roles.create({ data: { name: message.author.id, position, color: data.color_role.hex }})
                await emssage.member.roles.add(role.id)
            }
            return message.member.send(`You already received your special reward! You can change the color of your awarded role with \`${message.client.config.prefix}change <hex>\``)
        }
    }
}
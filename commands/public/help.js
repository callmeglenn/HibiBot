const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'help',
    hidden: true,
    run: async function (message) {
        const { client, channel } = message
        const cmds = client.commands.filter(cmd => !cmd.hidden)
        const commands = [], categories = []
        for (let command of cmds) {
            command = command[1]
            const cmdNames = commands.map(cmd => cmd.name)
            if (!cmdNames.includes(command.name)) commands.push(command)
            if (command.category && !categories.includes(command.category)) categories.push(command.category)
        }
        categories.sort((a, b) => b.length - a.length)
        const embed = new MessageEmbed().setColor('GREEN')
        for (const category of categories) {
            const categoryCommands = commands.filter(cmd => cmd.category == category)
            embed.addField(category.toUpperCase(), categoryCommands.map(c => `[\`${c.name}\`](https://discord.com)`).join(', '), true)
        }
        channel.send(embed)
    }
}
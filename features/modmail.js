const { MessageEmbed } = require('discord.js')
const MongoGuild = require('../library/MongoGuild')
const config = require('../config')
const pending = new Set()
const cooldowns = new Map()
async function modmail(client) {
    client.on('message', async function (message) {
        const { author, content, attachments } = message
        const channel = client.channels.cache.find(c => c.id == config.modmail.channelId && c.type == 'text')
        if (!channel || author.bot) return

        const cooldown = cooldowns.get(author.id)
        // If it's not in dms, or they're in pending, or they're in cooldown
        if (message.guild || pending.has(author.id) || cooldown > Date.now()) return
        // Add them to pending
        pending.add(author.id)

        const dmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle("Your ticket has been sent!")
            .setDescription("Please patiently wait for our staff team to get to you.")
        const dmmsg = await message.channel.send(dmbed)

        const modbed = new MessageEmbed()
            .setColor('ORANGE')
            .setFooter(`React with ✅ to accept • React with ❌ to decline`)
            .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
            .setImage(getAttachmentLink(attachments.size ? attachments.first().url : ''))
            .setDescription(content)

        const modmsg = await channel.send(modbed)
        const emojis = ['✅', '❌']
        emojis.forEach(emoji => modmsg.react(emoji))

        const filter = (r, u) => emojis.some(emoji => [r.emoji.name, r.emoji.id].includes(emoji) && !u.bot)
        const collected = await modmsg.awaitReactions(filter, { max: 1, time: 300000 })
        // Nobody reacted
        if (!collected.size) {
            author.send('Notification').then(m => m.delete())
            dmmsg.edit({ embed: { color: "RED", title: "Looks like our staff team is too busy at the moment\nFeel free to try again in 5 minutes!" } })
            modmsg.edit({ embed: { color: "RED", title: "Nobody reacted in time" } })
            return cooldowns.set(author.id, Date.now() + 300000)
        }
        const emoji = collected.first().emoji.name
        const mod = modmsg.reactions.cache.get(emoji).users.cache.filter(u => !u.bot).first()
        // Rejection
        if (emoji == '❌') {
            pending.delete(author.id)
            author.send('Notification').then(m => m.delete())
            dmmsg.edit({ embed: { color: "RED", author: { name: `Declined by ${mod.tag}`, iconURL: mod.displayAvatarURL({ dynamic: true }) }, description: "This may mean that you have provided insufficient evidence for the staff team to do anything about it. Feel free to try again in 5 minutes!" } })
            modmsg.edit(modbed.setColor('RED').setFooter(`Request declined by ${mod.tag}`, mod.displayAvatarURL({ dynamic: true })))
            return cooldowns.set(author.id, Date.now() + 300000)
        }
        // Acceptance
        if (emoji == '✅') {
            modmsg.edit(modbed.setColor('GREEN').setFooter(`Request accepted by ${mod.tag}`, mod.displayAvatarURL({ dynamic: true })))

            author.send('Notifcation').then(m => m.delete())
            dmmsg.edit({ embed: { color: "GREEN", author: { name: `Accepted by ${mod.tag}`, iconURL: mod.displayAvatarURL({ dynamic: true }) }, description: "Your ticket has been accepted by one of our staff members, they will be contacting you shortly! Any messsages you send from now on will be sent to them and vice versa." } })

            const accepted = client.channels.cache.find(c => c.id == config.modmail.category.acceptedId && c.type == 'category')
            const { guild } = channel
            const permissionOverwrites = [{ id: guild.id, deny: ['VIEW_CHANNEL'] }, { id: mod.id, allow: ['VIEW_CHANNEL'] }]
            for (const id of config.modmail.permissionIds) if (await guild.members.fetch(id) || guild.roles.cache.get(id)) permissionOverwrites.push({ id, allow: ['VIEW_CHANNEL'] })

            const { ticket: number } = await new MongoGuild(guild.id).addTicket()
            const ticket = await guild.channels.create(`${number}-${author.tag}`, { permissionOverwrites, parent: accepted ? accepted.id : null })
            ticket.send(new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
                .setDescription(content)
                .setImage(getAttachmentLink(attachments.size ? attachments.first().url : ''))
                .setFooter(`You can close this report at any time by typing ${config.prefix}close\nRealize this report was a waste of time? Type ${config.prefix}trash to prevent the user from posting another report for the next 1 hour`)
            )

            const dmFilter = (m) => author.id == m.author.id
            const channelFilter = (m) => !m.author.bot
            const channelCollector = ticket.createMessageCollector(channelFilter)
            const dmCollector = author.dmChannel.createMessageCollector(dmFilter)

            channelCollector.on('collect', function (m) {
                if (m.content.toLowerCase() == `${config.prefix}close`) {
                    pending.delete(author.id)
                    dmCollector.stop()
                    return channelCollector.stop({ reason: 'close' })
                }
                if (m.content.toLowerCase() == `${config.prefix}trash`) {
                    pending.delete(author.id)
                    dmCollector.stop()
                    return channelCollector.stop({ reason: 'trash' })
                }
                const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor(m.author.tag, m.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(m.content)
                    .setImage(getAttachmentLink(m.attachments.size ? m.attachments.first().url : ''))
                message.author.send(embed)
                ticket.send(embed)
            })
            dmCollector.on('collect', function (m) {
                const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
                    .setDescription(m.content)
                    .setImage(getAttachmentLink(m.attachments.size ? m.attachments.first().url : ''))
                ticket.send(embed)
            })

            channelCollector.on('end', async function (data, { reason }) {
                if (!reason) return author.send({ embed: { color: "RED", title: "An error has occured" } })

                const moved = guild.channels.cache.find(c => c.id == config.modmail.category.closedId && c.type == 'category')
                if (moved) await ticket.setParent(moved, { lockPermissions: false })

                if (reason == 'trash') {
                    cooldowns.set(author.id, Date.now() + 3.6e+6) 
                    ticket.send(new MessageEmbed().setColor('RED').setAuthor(`Trashed by ${data.last().author.tag}`, data.last().author.displayAvatarURL({ dynamic : true })).setDescription(`${author} will no longer be allowed to send another report for the next 1 hour.`))
                    
                    return author.send({ embed: { color: "RED", title: "You are not permitted to send another report for the next 1 hour", description: "A staff member has deemed your ticket as invalid and a misuse of time." } })
                    
                }
                if (reason == 'close') {
                    ticket.send(new MessageEmbed().setColor('RED').setAuthor(`Closed by ${data.last().author.tag}`, data.last().author.displayAvatarURL({ dynamic: true })))
                    return author.send({ embed: { color: "GREEN", title: "Thank you for your report!", description: "Thank you for your report! A staff member has taken action and has decided that your ticket is no longer needed, feel free to write another ticket if you come across rulebreaking content." } })
                }
            })
        }
    })
}
module.exports = async function (client) {
    modmail(client)
}

function getAttachmentLink(attachment) {
    const valid = /^.*(gif|png|jpg|jpeg)$/g
    return valid.test(attachment) ? attachment : ''
}
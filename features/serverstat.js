const MongoGuild = require('../library/MongoGuild')
async function serverStats(client) {
    const guilds = client.guilds.cache.array()
    for (const guild of guilds) {
        const mongo = new MongoGuild(guild.id)
        const database = await mongo.get()

        if (database) {
            const { all, humans, bots } = database
            if (all.enabled) {
                let channel = guild.channels.cache.get(all.channelId)
                if (!channel) {
                    channel = await guild.channels.create(`All Members: ${guild.memberCount}`, { type: 'voice', permissionOverwrites: [{ id: guild.id, deny: ['CONNECT'] }] })
                    await mongo.all(channel.id, true)
                }
                else if (channel.name !== `All Members: ${guild.memberCount}`) channel.setName(`All Members: ${guild.memberCount}`)
            }
            if (humans.enabled || bots.enabled) {
                const members = await guild.members.fetch()
                const humanCount = members.filter(m => !m.user.bot).size
                const botCount = members.filter(m => m.user.bot).size
    
                if (humans.enabled) {
                    let channel = guild.channels.cache.get(humans.channelId)
                    if (!channel) {
                        channel = await guild.channels.create(`Members: ${humanCount}`, { type: 'voice', permissionOverwrites: [{ id: guild.id, deny: ['CONNECT'] }] })
                        await mongo.human(channel.id, true)
                    }
                    else if (channel.name !== `Members: ${humanCount}`) channel.setName(`Members: ${humanCount}`)
                }
                if (bots.enabled) {
                    let channel = guild.channels.cache.get(bots.channelId)
                    if (!channel) {
                        channel = await guild.channels.create(`Bots: ${botCount}`, { type: 'voice', permissionOverwrites: [{ id: guild.id, deny: ['CONNECT'] }] })
                        await mongo.human(channel.id, true)
                    }
                    else if (channel.name !== `Bots: ${botCount}`) channel.setName(`Bots: ${botCount}`)
                }
            }
        }
    }
    setTimeout(() => serverStats(client), 360000)
}
module.exports = async function (client) {
    serverStats(client)
}
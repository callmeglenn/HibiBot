const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'], fetchAllMembers: true })
require('mongoose')
const mongo = require('./mongo')

const config = require('./config')
client.config = config
client.commands = new Discord.Collection()

const { registerEvents, registerCommands } = require('./utils/registry')
client.once('ready', async function () {
    console.log("Connected to Discord")
    await mongo().then(function(mongoose) {
        console.log('Connected to Mongo')
        await mongoose.connection.close()
    })
    if (config.activity.streaming) await client.user.setActivity(config.activity.game, { type: 'STREAMING', url: "https://twitch.tv/HibikiSpring" })
    else await client.user.setActivity(config.activity.game, { type: 'WATCHING' })
    
    await registerEvents(client, '../events')
    await registerCommands(client, '../commands')
    await require('./features/temprole')(client)
    await require('./features/modmail')(client)
    await require('./features/serverstat')(client)
    await require('./features/level')(client)
})
client.login(client.config.token)
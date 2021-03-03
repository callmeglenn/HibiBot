const MongoUser = require('../library/MongoUser')
const MongoLevel = require('../library/MongoLevel')
const config = require('../config')
const cooldowns = new Map()
module.exports = async function(client) {
    client.on('message', async function(message) {
        const { member, guild, channel } = message
        if (!guild || member.user.bot) return

        const cooldown = cooldowns.get(member.id)
        if (cooldown && cooldown > Date.now()) return
        cooldowns.set(member.id, Date.now() + 60000)
        setTimeout(() => cooldowns.delete(member.id), 60000)

        const xp = random(config.level.min, config.level.max)
        const mongo = new MongoUser(guild.id, member.id)
        const data = await mongo.level.add(xp)

        const { level, xp: myXp } = data
        const needed = (config.level.base) + (level * config.level.max)
        
        // Level Up?
        if (myXp >= needed) {
            const remainingXP = myXp - needed
            await mongo.level.up(remainingXP)
            channel.send(`${member} leveled up to level **${level + 1}**!`)

            const lmongo = new MongoLevel(guild.id)
            const data = await lmongo.get(level + 1)
            if (!data) return

            const role = guild.roles.cache.get(data.roleId)
            if (!role) return

            const levelRoles = (await lmongo.get(true)).map(d => d.roleId)
            const myRoles = member.roles.cache.map(r => r.id)
            const myNewRoles = myRoles.filter(id => !levelRoles.includes(id))
            myNewRoles.push(role.id)
            await member.roles.set(myNewRoles)
        }
    })
}

function random(min, max) {
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  }
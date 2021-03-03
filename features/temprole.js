const MongoTempRole = require('../library/MongoTempRole')
async function temprole(client) {
    const temp = new MongoTempRole()
    const temproles = (await temp.get.all()).filter(data => Date.now() >= data.end)
    for (const temprole of temproles) {
        const {
            guildId,
            userId,
            roleId
        } = temprole

        const guild = client.guilds.cache.get(guildId)
        if (guild) {
            const role = guild.roles.cache.get(roleId), member = await guild.members.fetch(userId).catch(()=>{return})
            if (role && member && member.roles.cache.get(role.id)) await member.roles.remove(role.id).catch(()=>{return})
        }
        await temp.delete(guildId, userId, roleId)
    }

    setTimeout(() => temprole(client), 30000)
}
module.exports = async function(client) {
    temprole(client)
}
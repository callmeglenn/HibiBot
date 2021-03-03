const mongo = require('../mongo')
const schema = require('../mongodb/temprole')
module.exports = class temprole {
    constructor(guildId, userId) {
        this.guildId = guildId, this.userId = userId, this.get = new get(this.guildId, this.userId)
    }
    /**
     * @param {String} roleId The role ID
     * @param {Number} end The time the role will be removed in milliseconds
     */
    async add(roleId, end) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, userId: this.userId, roleId }, { $set: { end }}, { upsert: true, new: true })
    }
    async delete(guildId, userId, roleId) {
        await mongo()
        return await schema.findOneAndDelete({ guildId, userId, roleId })
    }
}
class get {
    constructor(guildId, userId) {
        this.guildId = guildId, this.userId = userId
    }
    async all() {
        await mongo()
        return await schema.find()
    }
    async byGuild() {
        await mongo()
        return await schema.find({ guildId: this.guildId })
    }
    async byRole(roleId) {
        await mongo()
        return await schema.findOne({ guildId: this.guildId, userId: this.userId, roleId })
    }
}
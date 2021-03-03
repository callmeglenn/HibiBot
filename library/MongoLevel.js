const schema = require('../mongodb/level')
const mongo = require('../mongo')
module.exports = class MongoLevel {
    constructor(guildId) {
        this.guildId = guildId
    }
    /**
     * @param {Boolean} levelorAll IF passing in the number, it will try to find the number. If passing in a boolean, it will return everything 
     */
    async get(levelorAll) {
        await mongo()
        if (typeof levelorAll == 'boolean') return await schema.find({ guildId: this.guildId })
        if (typeof levelorAll == 'number') return await schema.findOne({ guildId: this.guildId, level: levelorAll }) 
    }
    async add(roleId, level) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, level }, { $set: { roleId }}, { upsert: true, new: true })
    }
    async delete(level) {
        await mongo()
        return await schema.findOneAndDelete({ guildId: this.guildId, level })
    }
}
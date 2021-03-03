const schema = require('../mongodb/guild')
const mongo = require('../mongo')
module.exports = class guild {
    constructor(guildId) {
        this.guildId = guildId
    }
    async get() {
        await mongo()
        let data = await schema.findOne({ guildId: this.guildId })
        if (!data) data = await new schema({ guildId: this.guildId })
        return data
    }
    async addTicket() {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId }, { $inc: { ticket: 1 }}, { upsert: true, new: true })
    }
    async all(channelId, boolean) {
       await mongo()
       return await schema.findOneAndUpdate({ guildId: this.guildId }, { $set: { all: { channelId, enabled: boolean }}}, { upsert: true, new: true }) 
    }
    async human(channelId, boolean) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId }, { $set: { humans: { channelId, enabled: boolean }}}, { upsert: true, new: true })
    }
    async bot(channelId, boolean) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId }, { $set: { bots: { channelId, enabled: boolean }}}, { upsert: true, new: true })
    }
}
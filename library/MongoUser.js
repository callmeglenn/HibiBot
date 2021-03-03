const mongo = require('../mongo')
const schema = require('../mongodb/user')
module.exports = class user {
    constructor(guildId, userId) {
        this.guildId = guildId, this.userId = userId
        this.cr = new cr(this.guildId, this.userId)
        this.level = new level(this.guildId, this.userId)
    }
    async get() {
        await mongo()
        let data = await schema.findOne({ guildId: this.guildId, userId: this.userId })
        if (!data) data = await new schema({ guildId: this.guildId, userId: this.userId }).save()
        return data
    }
    async all() {
        await mongo()
        return await schema.find({ guildId: this.guildId })
    }
}
class cr {
    constructor(guildId, userId) {
        this.guildId = guildId, this.userId = userId
        this.update = new crUpdate(this.guildId, this.userId)
    }
    async create(roleId, hex) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, userId: this.userId }, { $set: { color_role: { roleId, hex }}}, { upsert: true, new: true })
    }
}
class crUpdate {
    constructor(guildId, userId) {
        this.guildId = guildId, this.userId = userId
    }
    async roleId(roleId) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, userId: this.userId }, { $set: { "color_role.roleId": roleId }}, { upsert: true, new: true })
    }
    async hex(hex) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, userId: this.userId }, { $set: { "color_role.hex": hex }}, { upsert: true, new: true })
    }
}
class level {
    constructor(guildId, userId) {
        this.guildId = guildId, this.userId = userId
    }
    async add(xp) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, userId: this.userId }, { $inc: { xp }}, { upsert: true, new: true })
    }
    async up(xp) {
        await mongo()
        return await schema.findOneAndUpdate({ guildId: this.guildId, userId: this.userId }, { $set: { xp }, $inc: { level : 1 }}, { uspert: true, new: true })
    }
}
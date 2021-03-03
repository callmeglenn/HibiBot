const mongoose = require('mongoose')
const str = { type: String, default: '' }
const num = { type: Number, default: 0 }
const bool = { type: Boolean, default: false }
const schema = mongoose.Schema({
    guildId: str,
    ticket: num,
    all: { channelId: str, enabled: bool },
    humans: { channelId: str, enabled: bool },
    bots: { channelId: str, enabled: bool }
})
module.exports = mongoose.model('guild', schema)
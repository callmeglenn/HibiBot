const mongoose = require('mongoose')
const str = { type: String, default: '' }
const num = { type: Number, default: 0 }
const schema = mongoose.Schema({
    guildId: str,
    roleId: str,
    level: num
})
module.exports = mongoose.model('level', schema)
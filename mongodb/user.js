const mongoose = require('mongoose')
const str = { type: String, default: '' }
const num = { type : Number, default: 0 }
const schema = mongoose.Schema({
    guildId: str,
    userId: str,
    color_role: { roleId: str, hex: str },
    level: num,
    xp: num
})
module.exports = mongoose.model('user', schema)
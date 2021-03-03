const mongoose = require('mongoose')
const str = { type: String, default: '' }
const num = { type: Number, default: 0 }
const schema = mongoose.Schema({
    guildId: str,
    userId: str,
    roleId: str,
    end: num
})
module.exports = mongoose.model('temprole', schema)
const Booru = require('booru')
module.exports = {
    name: 'verniykc',
    aliases: ['verniy'],
    description: "Get a random image of Verniy from Kancolle: Kantai Collection on Safebooru.",
    category: 'public',
    run: async function (message) {
        const search = await Booru.search('safebooru', ['verniy_(kantai_collection)'], { limit: 1, random: true })
        message.channel.send(search.posts[0].fileUrl)
    }
}
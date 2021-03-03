const Booru = require('booru')
module.exports = {
    name: 'hibikikc',
    aliases: ['hibiki'],
    description: "Get a random image of Hibiki from Kancolle: Kantai Collection on Safebooru.",
    category: 'public',
    run: async function (message) {
        const search = await Booru.search('safebooru', ['hibiki_(kantai_collection)'], { limit: 1, random: true })
        message.channel.send(search.posts[0].fileUrl)
    }
}
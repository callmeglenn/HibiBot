const responses = [
    "Wears a similar serafuku to the rest of her class with an anchor emblem on the chest.",
    "She and Akatsuki wear navy hats that also bear an anchor emblem.",
    "She has bleached hair that is slightly disheveled, in a similar manner to her sisters.",
    "Another trait shared with her sisters is the matching colour of her eyes and hair."
]
module.exports = {
    name: 'appearance',
    description: "Gets a random look of Hibiki.",
    aliases: ['looks'],
    category: "public",
    run: async function (message) {
        const response = responses[Math.floor(Math.random() * responses.length)]
        message.channel.send(response)
    }
}
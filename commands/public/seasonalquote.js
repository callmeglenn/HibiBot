const responses = [
    "Commander's hand... is warm. No, that's... It's very handy in Russia.", 
    "Commander, I brought some Russian chocolate. What makes that Russian? It's a secret.", 
    "Spring, huh. Spring is nice. A winter will always be followed by spring. Хорошо (Very good).", 
    "Commander, what's this? Return gift? Thank you. I'll take it.", 
    "Commander, it's the fleet's and our 6thDesDiv's third anniversary. Splendid. As expected, this is... pleasant.", 
    "Inazuma's teru-teru bouzu, looks nice. It's cute. As for Akatsuki's... what may it be? A monster?", 
    "Commander's hand... it's warm. No, that's... It's a gifted hand to have in Russia.", 
    "Akatsuki, you have to build the breakwater taller or else... Ah... it's fine, we can always build it again. Let me help you."
]
module.exports = {
    name: 'seasonalquote',
    description: "Get a random seasonal quote from Hibiki.",
    aliases: ['squote'],
    category: 'public',
    run: async function (message) {
        const response = responses[Math.floor(Math.random() * responses.length)]
        message.channel.send(response)
    }
}
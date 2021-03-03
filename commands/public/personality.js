const responses = [
    "Characterized in the anime by her vacant attitude and expression.",
    "A calm and stoic Russophile who tends to include Russian words in her speech. As Верный, she speaks more Russian.",
    "However, as revealed in the 4-koma, her vocabulary in Russian is noted to be rather limited, as Fubuki tries to hold a conversation with her in Russian, only for Verniy to panic and say that it would be better for them to converse in Japanese instead."
]
module.exports = {
    name: 'personality',
    description: "Get a random characteristic of Hibiki.",
    category: 'public',
    run: async function(message) {
        const response = responses[Math.floor(Math.random() * responses.length)]
        message.channel.send(response)
    }
}
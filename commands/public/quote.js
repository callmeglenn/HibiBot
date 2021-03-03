const responses = [
    "I'm Hibiki. I'm also referred to as The Phoenix from my exploits.",
    "I'm Hibi— Верный. It's a name that has the meaning of Faithful (in Russian).",
    "Surviving till the very end among the many special-class destroyers was I, Hibiki. After experiencing several battles, I was unable to accompany the Yamato Surface Special Attack Force due to repairs. I was handed over to the Soviet Union as a prize of war, and was given a name that means Faithful (in Russian).",
    "Commander, what is it?", "Commander, are you alright?",
    "Is it fine if I return soon?",
    "Commander, your orders please.",
    "до свидания.",
    "It's all right. Even if I am alone.",
    "Commander, aren't you tired?", "Commander, things like affection and love... what are they...? Eh? You'll teach me?",
    "It appears there is a message for you, Commander.",
    "Roger, Hibiki, heading out.", "Roger, Верный, heading out.",
    "Хорошо... I can feel the power in this.",
    "Хорошо... I can trust in this.",
    "Hm, this is great... Спасибо.",
    "This is great... Спасибо.",
    "That'll work.",
    "Ура!",
    "Спасибо.",
    "I'll go patch myself up.",
    "The secret of The Phoenix lies in the timing of its repairs as well.",
    "I heard the repairs of the ship are completed.",
    "It seems like fresh forces have been added.",
    "The fleet has returned. Thanks for the hard work.",
    "My reputation as The Phoenix isn't just for show. Sortieing.",
    "My name of Faithful isn't just for show. Sortieing.", "Well then, shall we do it?",
    "How futile.",
    "Too slow.",
    "Хорошо.",
    "Victory? It has a nice ring to it. I don't hate it.",
    "Ugh...",
    "I won't sink...",
    "As expected, this is... embarrassing.",
    "My final name is Verniy... до свидания.",
    "My true name is Hibiki... до свидания... Goodbye."
]
module.exports = {
    name: 'seasonalquote',
    description: "Get a random quote from Hibiki.",
    category: 'public',
    run: async function (message) {
        const response = responses[Math.floor(Math.random() * responses.length)]
        message.channel.send(response)
    }
}
const responses = [
    "Hibiki means echo, Верный (Verniy) means loyal and her final name, Декабрист (Dekabrist) is a tribute to the Decembrist revolt.", 
    "Hibiki was first carried by the twenty-first ship of the first Kamikaze class in 1906.", 
    "Верный was first carried by a submarine class in the old USSR.", 
    "Hibiki's present incarnation exists as the lead ship of Hibiki-class Ocean Surveillance Ship, AOS-5201 JDS Hibiki of Japan Maritime Self-Defense Force.", 
    "Received her Kai Ni (Верный) on 11/09/2013.", 
    "Shunsaku Kudō was transferred to Hibiki after his humanitarian rescue of enemy personnel while captain of Ikazuchi.", 
    "She was retired from service on February 20 1953 and sunk as a target by the Soviet Naval Aviation team sometime in the 1970's at Karamzina Island near Vladivostok.", 
    "After being discovered in 2012, her wreckage is now a popular diving site. Seasonal diving tours to her wreckage are available."
]
module.exports = {
    name: 'trivia',
    description: "Get a random piece of information about Hibiki.",
    category: 'public',
    run: async function(message) {
        const response = responses[Math.floor(Math.random() * responses.length )]
        message.channel.send(response)
    }
}
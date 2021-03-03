module.exports = {
    prefix: `h!`,
    token: `ODE2MjA4MjYxMzgzODQ3OTc3.YD3nLQ.g0d8SA2rGdDBj-dUeLc9ao7WNSg`,
    mongoPath: `mongodb+srv://HibikiSpring:T0114766d@cluster0.mtjxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,

    activity: {
        streaming: true,
        game: `h!help`
    },
    level: {
        // the base XP
        base: 500,
        // the level multiplier added to their base depending on their level
        /**
         * let level be 1, base xp be 500, and multiplier be 200
         * Total XP = 500 + (1 * 200)
         */
        multiplier: 200,
        // min amount of xp members can earn
        min: 15,
        // max amount of xp members can earn
        max: 25
    },

    // the id where all logs will be sent to
    logId: '682339331762815095',

    modmail: {
        // the ids that will be permitted to view the newly created ticket channel, members who accept the report are automatically allowed to view the channel
        // ids can either be a member or a role
        permissionIds: ['574642435184132096', '574642646853615626', '682331131500429532'],
        // the channel id where all new modmail messages will be sent to
        channelId: '816179015026999386',
        category: {
            // the category all accepted modmails will be moved to
            acceptedId: '682341298631737351',
            // the category all closed modmails will be moved to
            closedId: '682341298631737351'
        }
    }
}
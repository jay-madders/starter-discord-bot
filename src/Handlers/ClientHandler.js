const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { loadDiscord } = require('./LoaderHandler')

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

module.exports = class ClientHandler extends Client {
    constructor() {
        super({
            intents: [
                Guilds,
                GuildMembers,
                GuildMessages
            ],
            partials: [
                User,
                Message,
                GuildMember,
                ThreadMember,
                Channel
            ]
        })

        this.commands = new Collection()
        this.loaded   = false
    }


    async startDiscordBot(token = process.env.BOT_TOKEN) {
       if(!token) return console.error('[LOGIN ERROR][ClientHandler.js] You need to provide a token inside of your .env file!')

       super.login(token).then(() => {
        loadDiscord(this)
       })
    }
}
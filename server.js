require('dotenv').config()

const tmi = require('tmi.js')

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
    name: {
        response: 'Guilherme'
    },
    upvote:{
        response: () => `User ${user} was just upvoted`
    }
}

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
    channels: ['guijoazeiro'],
    identity: {
        username: process.env.TWITCH_BOT_USERNANE,
        password: process.env.TWITCH_OAUTH_TOKEN
    }
})

client.connect();

client.on('message', (channel, tags, message, self) => {
    const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNANE

    if (!isNotBot) return

    const [raw, command, argument] = message.match(regexpCommand);
   
    if (command) {
        client.say(channel, `Command ${command} found with argument ${argument}`)
    }

    console.log(`${tags['display-name']}: ${message}`);
})
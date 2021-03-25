require('dotenv').config()
const tmi = require('tmi.js')

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
    // "Alca: Hello, World!"
    console.log(`${tags['display-name']}: ${message}`);
})
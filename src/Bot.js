require('dotenv').config();
const ClientHandler = require('./Handlers/ClientHandler')
const client        = new ClientHandler();

client.startDiscordBot() //start the client
const ascii = require('ascii-table');
const fs = require('fs');

async function loadDiscord(client) {
  try {
    await loadEvents((dirPath = "./src/events"), client);
    await loadCommands((dirPath = "./src/slashcommands"), client);
  } catch (error) {
    console.error(`[LOADER ERROR][LoaderHandler.js] ${error}`);
  }
}

async function loadCommands(dirPath, client) {
    const commandsArray = [];

    const commandsFolder = fs.readdirSync(dirPath);
    for(const folder of commandsFolder) {
      const commandFiles = fs.readdirSync(`${dirPath}/${folder}`);
  
      for(const file of commandFiles) {
        const commandFile = require(`../slashcommands/${folder}/${file}`);
  
        client.commands.set(commandFile.data.name, commandFile);
  
        commandsArray.push(commandFile.data.toJSON());
      }
    }

    client.application.commands.set(commandsArray);
    
    return console.log(`Loaded ${commandsArray.length} Commands`);
}

async function loadEvents(dirPath, client) {
    const folders = fs.readdirSync(dirPath);

    let events = []
  for(const folder of folders) {
    const files = fs.readdirSync(`${dirPath}/${folder}`).filter(file => file.endsWith('.js'));


    for(const file of files) {
      const event = require(`../events/${folder}/${file}`);
      events.push(event)

      if(event.rest) {
        if(event.once)
          client.rest.once(event.name, (...args) => event.execute(...args, client));
        else
          client.rest.on(event.name, (...args) => event.execute(...args, client));
      } else {
        if(event.once)
          client.once(event.name, (...args) => event.execute(...args, client));
        else 
          client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }

  return console.log(`Loaded ${events.length} events`);

}


module.exports = {
    loadDiscord
}
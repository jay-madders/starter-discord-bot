module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
      client.loaded = true;
      console.log(`${client.user.tag} is now online, with ${client.users.cache.size} users using ${client.commands.size} commands.`);
    }
  }
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('ping')
  // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // only allowed for admin users
  .setDescription('Pong'),
  execute(interaction) {
    interaction.reply({ content: "Pong", ephemeral: true }); // ephemeral means only visible for yourself
  }

}
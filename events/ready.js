module.exports = async client => {
    // Logs that the bot is online.
    client.logger.log(`[READY] ${client.user.tag}, at your service to serve ${client.users.size} users in ${client.guilds.size} servers.`);
  
    // Make the bot "play the game" which is the help command with default prefix. Essentially a playing status lol
    client.user.setActivity(`with code. | ${client.config.defaultSettings.prefix} help`, {type: "PLAYING"});
  };
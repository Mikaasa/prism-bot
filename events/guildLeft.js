// This event executes when a new guild (server) is left.
const logger = require("../util/logger.js");

module.exports = (client, guild) => {
  client.logger.leave(`[GUILD LEAVE] Prism has left: ${guild.name} (${guild.id}) `);

  // If the settings Enmap contains any guild overrides, remove them.
  // No use keeping stale data!
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
};
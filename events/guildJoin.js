// This event executes when a new guild (server) is joined.
const logger = require("../util/logger.js");

module.exports = (client, guild) => {
  client.logger.join(`[GUILD JOIN] Prism has joined: ${guild.name} (${guild.id}) | Server Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};
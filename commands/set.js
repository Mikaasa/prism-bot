const { inspect } = require("util");

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  // Retrieve current guild settings (merged) and overrides only.
  const settings = message.settings;
  const overrides = client.settings.get(message.guild.id);
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "ADMINISTRATOR");
  // Edit an existing key value
  if (action === "edit") {
    // User must specify a key.
    if (!key) return message.reply("please specify a key to edit.");
    // User must specify a key that actually exists!
    if (!settings[key]) return message.reply("this key does not exist in the settings.");
    // User must specify a value to change.
    if (value.length < 1) return message.reply("please specify a new value.");
    // User must specify a different value than the current one.
    if (value.join(" ") === settings[key]) return message.reply("this setting already has that value!");
    
    // If the guild does not have any overrides, initialize it.
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    // setProp is an enmap feature, it defines a single property of an object in an enmap key/value pair.
    client.settings.setProp(message.guild.id, key, value.join(" "));

    // Confirm everything is fine!
    message.reply(`${key} successfully edited to ${value.join(" ")}`);
  } else
  
  // Resets a key to the default value
  if (action === "reset") {
    if (!key) return message.reply("please specify a key to reset.");
    if (!settings[key]) return message.reply("this key does not exist in the settings.");
    if (!overrides[key]) return message.reply("this key does not have an override and is already using defaults.");
    
    // awaitReply method in functions.js
    const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response.toLowerCase())) {
      // We delete the `key` here.
      delete overrides[key];
      client.settings.set(message.guild.id, overrides);
      message.reply(`${key} was successfully reset.`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply("action cancelled.");
    }
  } else
  
  if (action === "get") {
    if (!key) return message.reply("please specify a key to view.");
    if (!settings[key]) return message.reply("this key does not exist in the settings.");
    const isDefault = !overrides[key] ? "\nThis is the default global default value." : "";
    message.reply(`the value of ${key} is currently ${settings[key]}${isDefault}`);
  } else {
    message.channel.send(inspect(settings), {code: "json"});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "Administrator"
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server. These reset when the bot leaves, should you invite it back, it will need to be configured again.",
  usage: "set <view/get/edit> <key> <value>"
};
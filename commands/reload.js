exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  if (!args || args.length < 1) return message.reply("you must provide a valid command to reload.");

  let response = await client.unloadCommand(args[0]);
  if (response) return message.reply(`error unloading: ${response}`);

  response = client.loadCommand(args[0]);
  if (response) return message.reply(`error loading: ${response}`);

  message.reply(`the command: \`${args[0]}\` has been reloaded.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads the command file, if it has been updated or modified.",
  usage: "reload <commandname>"
};

const exec = require('child_process').exec;
const warn = require('../util/logger.js')

exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send('You must provide a command to execute.')
  exec(`${args.join(' ')}`, (error, stdout) => {
    const response = (error || stdout);
    client.logger.warn('JavaScript code was executed!');
    return message.channel.send(`Command Ran: ${args.join(" ")}\n${response}`, {
      code: "js",
      split: "\n"
    }).catch(console.log);
  });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['execute', 'exe'],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "exec",
  category: "System",
  description: "Executes command prompt code.",
  usage: "exec [..code]"
};
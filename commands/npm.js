const snekfetch = require("snekfetch");
const humanizeduration = require("humanize-duration");
const config = require("../util/config.js");

exports.run = async (bot, message, args) => {
    if (args.length > 0) {
        snekfetch.get("https://skimdb.npmjs.com/registry/" + args[0].toLowerCase()).then((body) => {
            message.channel.send({
                embed: {
						title: "NPM Package",
						color: config.green,
						fields: [
							{
								name: "Name",
								value: body.body.name,
								inline: true
                            },
							{
								name: "Description",
								value: body.body.description,
								inline: true
                            },
							{
								name: "Author",
								value: body.body.author.name,
								inline: true
							},
							{
								name: "Latest",
								value: body.body["dist-tags"].latest,
								inline: true
							},
							{
								name: "GitHub",
								value: ((body.body.repository) ? body.body.repository.url.replace("git+", "").replace(".git", "").replace("git://", "https://").replace("git@github.com:", "https://github.com/") : "No Repository"),
								inline: true
							},
							{
								name: "Maintainers",
								value: body.body.maintainers.map((m) => m.name).join(", "),
								inline: true
							},
							{
								name: "Last Updated",
								value: humanizeduration(Date.now() - new Date(body.body.time[body.body["dist-tags"].latest]).getTime(), {
									round: true,
									largest: 2
								}),
								inline: true
                            }
						]
					}
            })
        }).catch((error) => {
            if (error.status === 404) return message.channel.send({
                embed: {
                    title: "Error",
                    color: config.red,
                    description: "An error occured while fetching that NPM package.."
                }
            })
            console.error("Failed to grab NPM Package.", error.message);
            message.reply("the NPM Package " + args[0] + " was not found. Check your capitalization, perhaps?") 
        })
    } else {
        message.channel.send({
				embed: {
					title: "Error",
					color: config.red,
					description: "Invalid arguments! Correct usage: npm <package-name>"
				}
			});
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "npm",
    category: "Miscellaneous",
    description: "Gives you some information about the given package.",
    usage: "npm <package-name>"
  };
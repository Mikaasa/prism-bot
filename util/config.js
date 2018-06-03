const config = {
    // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID. (gotta add a check for that but too lazy)
    "ownerID": "397143477621751808",

    // Bot Admins, level 9 by default. Array of user ID strings.
    "admins": ['346050964828061699'],

    // Bot Support, level 8 by default. Array of user ID strings.
    "support": ['348914426482786306'],

    // Bot token, required to run
    "token": "NDUyMzU3MDI1NjUzODUwMTQw.DfPKtA.4etwNHhidx8iomXGpt3D9WrI7iQ",

    // Just makes it so I can use the word 'red' instead of the hexcode in embed, goes for any color defined here
    "red": "13959168",
    
    "orange": "16738816",
    
    "green": "65318",
    
    "purple": '14025935',

    // Default per-server settings. New guilds have these settings.

    // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM VIA COMMANDS IN THE GUILD AS OF NOW! Still getting used to 'writefile' and data stores lol

    "defaultSettings": {
        "prefix": "prism",
        "modLogChannel": "logs",
        "modRole": "Moderator",
        "adminRole": "Administrator",
        "systemNotice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
        "welcomeChannel": "join-logs",
        "welcomeMessage": "[**USER JOINED**] {{user}}",
        "welcomeEnabled": "true"
    },

    // PERMISSION LEVEL DEFINITIONS.

    permLevels: [
        // This is the lowest permisison level, this is for non-roled users.
        {
            level: 0,
            name: "User",
            // Don't bother checking, just return true which allows them to execute any command their
            // level allows them to.
            check: () => true
        },

        // This is your permission level, the staff levels should always be above the rest of the roles!
        {
            level: 2,
            // This is the name of the role.
            name: "Moderator",
            // The following lines check the guild the message came from for the roles.
            // Then it checks if the member that authored the message has the role.
            // If they do, it wll return true, and it will allow them to execute the command in question.
            // If they don't, it then return false, and it will prevent them from executing the command.
            check: (message) => {
                try {
                    const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if (modRole && message.member.roles.has(modRole.id)) return true;
                } catch (e) {
                    return false;
                }
            }
        },

        {
            // Read lines 46 to 49 for reference.
            level: 3,
            name: "Administrator",
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    return (adminRole && message.member.roles.has(adminRole.id));
                } catch (e) {
                    return false;
                }
            }
        },
        // This is the server owner.
        {
            level: 4,
            name: "Server Owner",
            // Simple check, if the guild owner id matches the message author's ID, then it will return true.
            // Otherwise it will return false. Read lines 46 to 49 for reference.
            check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
        },

        // Bot Support is a special inbetween level that has the equivalent of server owner access
        // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
        {
            level: 8,
            name: "Bot Support",
            // The check is by reading if an ID is part of this array.
            check: (message) => config.support.includes(message.author.id)
        },

        // Bot Admin has some limited access like rebooting the bot or reloading commands.
        {
            level: 9,
            name: "Bot Admin",
            check: (message) => config.admins.includes(message.author.id)
        },

        // This is the bot owner, this should be the highest permission level available.
        // The reason this should be the highest level is because of dangerous commands such as eval
        // or exec (if the owner has that).
        {
            level: 10,
            name: "Bot Owner",
            // Another simple check, compares the message author id to the one stored in the config file.
            check: (message) => message.client.config.ownerID === message.author.id
        }
    ]
};

module.exports = config;
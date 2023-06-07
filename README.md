# RifterBot
This Discord bot is designed to perform various functions in a specific Discord server. If you want to use it for another Discord server, you would need to make a few changes and configurations. Here's a step-by-step explanation of how to edit the bot for another server:

1. **Create a new Discord application**: Go to the Discord Developer Portal (https://discord.com/developers/applications) and create a new application. This application will represent your bot.

2. **Get the necessary IDs**: Obtain the following IDs specific to your new Discord server:
   - `guildId`: The ID of your new Discord server (also known as a guild).
   - `channelIds`: Update the IDs of the channels used by the bot in the `channelIds` object according to your new server. The relevant channels are:
     - `welcomeChannel`: The ID of the channel where the welcome message will be sent when a new member joins.
     - `rulesChannel`: The ID of the channel where the rules message will be sent.
     - `memberRoleChannel`: The ID of the channel where members can select roles.
   - `roleIds`: Update the IDs of the roles used by the bot in the `roleIds` object according to your new server. The relevant roles are:
     - `diablo3Role`: The ID of the role associated with Diablo III.
     - `diablo2Role`: The ID of the role associated with Diablo II.
     - `lastEpochRole`: The ID of the role associated with Last Epoch.

3. **Set up the bot token**: Replace the `token` variable with the token of your bot, which can be obtained from the Discord Developer Portal. This token is required for the bot to authenticate and connect to your server.

4. **Configure the bot's presence**: Update the `activities` property of the `presence` object in the `Client` constructor to reflect the desired presence of your bot. For example, you can change the `name` and `type` properties to customize the displayed status.

5. **Customize commands**: If you want to add or modify commands for your bot, you can create new command files or edit existing ones in the `commands` directory. Each command file should follow the structure defined in the existing command files. Make sure to update the `commandsPath` variable to the correct directory path if you make any changes.

6. **Customize event handlers**: If you want to add or modify event handlers for your bot, you can do so by editing the respective event functions (`interactionCreate`, `guildMemberAdd`, `messageReactionRemove`, `messageReactionAdd`). Update the code within these event handlers to perform the desired actions in response to the corresponding events.

7. **Install dependencies**: Ensure that you have the necessary dependencies installed by running `npm install` in the project directory. This will install the required packages specified in the `package.json` file.

8. **Run the bot**: After making the necessary changes and configurations, you can start the bot by running `node bot.js` in the project directory. The bot will connect to the Discord server using the provided token and start listening for events and commands.

Remember to properly test the bot in your new server environment to ensure that it functions as intended.

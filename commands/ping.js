const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const timeTaken = Date.now() - interaction.createdTimestamp;
		interaction.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	},
};

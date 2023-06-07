const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diablo4')
		.setDescription('Shows a countdown of days until released!')
};
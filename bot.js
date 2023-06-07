const { Client, Events, REST, Routes, Collection, ActivityType, GatewayIntentBits, Partials, ActionRowBuilder, StringSelectMenuBuilder, ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType } = require("discord.js");
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const oneTimeEmbed = false;
const ids = {
  channelIds: {
    welcomeChannel: '1065988581857972224',
    rulesChannel: '1023083430763831378',
    memberRoleChannel: '1077756914848501910'
  },
  roleIds: {
    diablo3Role: '1072733191342936144',
    diablo2Role: '1077816441891475456',
    lastEpochRole: '1072733007183630497'
  }
};
const reactions = [
  {
    message: {
      id: '1077757512910131210',
      channel: 'CHANNEL_ID'
    },
    emojis: [
      {
        id: '1072734547986358282',
        role: 'DIABLO3_ROLE_ID'
      },
      {
        id: '1077816147598119002',
        role: 'DIABLO2_ROLE_ID'
      },
      {
        id: '1077814966796693615',
        role: 'LASTEPOCH_ROLE_ID'
      }
    ]
  }
];

const client = new Client({
	presence: {
		afk: false,
		activities: [{ name: `Rifter Clan Discord`, type: ActivityType.Watching }],
		status: 'dnd',
	},
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildIntegrations],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

const channelIds = ids.channelIds;
const roleIds = ids.roleIds;

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    const timeTaken = Date.now() - interaction.createdTimestamp;
    await interaction.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (interaction.commandName === 'diablo4') {
    const daysUntil = (year, month, day) => {
      const now = new Date();
      const dateEnd = new Date(year, month - 1, day);
      const days = (dateEnd - now) / 1000 / 60 / 60 / 24;
      return Math.round(days);
    };
    await interaction.reply({ content: `Diablo 4 Release Date Jun 06, 2023 remaining days are (${daysUntil(2023, 6, 6)})!`, fetchReply: true });
  }
});

client.on('guildMemberAdd', async (member) => {
  const exampleEmbed = new MessageEmbed()
    .setTitle('Welcome')
    .setDescription(`Now, you may select roles to access member channels for different games. Kindly go to the <#${channelIds.memberRoleChannel}> and select a role.`)
    .setAuthor('Rifter Bot', client.guilds.resolve(guildId).members.resolve('1072278798751510558').user.avatarURL(), 'https://discord.gg/rsXJtCXuhP')
    .setColor('#0099ff')
    .addFields({ name: '\u200B', value: `<@${member.user.id}>` })
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  const welcomeChannel = member.guild.channels.cache.get(channelIds.welcomeChannel);
  await welcomeChannel.send({ embeds: [exampleEmbed] });

  if (oneTimeEmbed) {
    const rulesChannel = member.guild.channels.cache.get(channelIds.rulesChannel);
    await rulesChannel.send({
      embeds: [
        {
          type: 'rich',
          title: 'Welcoming the new members [THE RULES]',
          description:
            'Hello, we are a Diablo III fan base on Discord.\nWe are here to welcome anyone who is new to our discord; the builds will be updated on a regular basis because we appreciate all of the fan builds and members. \n\nThis is the home of the Rifter Clan and Guild, and everyone must follow these rules. Rules. \n\n1. Do not post anything rated R on the server. \n\n2. If your actions and context are deemed unnecessary and uncalled for, we will be forced to remove you from the server. \n\n3. We do not post anything but Diablo 3-related content other than basic personal chat life. \n\n4. Any discord invites or spam will be banned from the server. \n\n5. Any links shared and found to be harmful to others will be dealt with by bans and other means. \n\n6. Do not share personal information with officers or members in this discord. \n\n7. Inviting all your friends who play Diablo III and beyond\n\nContact us.\nDo you want to contact us? Personally, make sure to message our officers in PM only!\nNeed some personal assistance with your build in the game? Or do you require someone to make suggestions on the Rift or Greater Rifter? We\'ll get you if we can, but we\'re not going to watch you play unless we want to.',
          color: 0xb91212,
          fields: [
            {
              name: '\u200B',
              value: 'Tell us your BattleTag in <#1055988142894764103> so we know who you are.\n',
              inline: true,
            },
          ],
          author: {
            name: 'Rifter Bot',
            url: 'https://discord.gg/rsXJtCXuhP',
            icon_url: client.guilds.resolve(guildId).members.resolve('1072278798751510558').user.avatarURL(),
          },
          footer: {
            text: 'Thanks for reading.',
          },
        },
      ],
    });
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();

  for (const react of reactions) {
    if (reaction.message.id === react.message.id) {
      const member = await reaction.message.guild.members.fetch(user.id);

      for (const emoji of react.emojis) {
        if (reaction.emoji.id === emoji.id) {
          member.roles.remove(roleIds[emoji.role]);
          break;
        }
      }

      break;
    }
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();

  for (const react of reactions) {
    if (reaction.message.id === react.message.id) {
      const member = await reaction.message.guild.members.fetch(user.id);

      for (const emoji of react.emojis) {
        if (reaction.emoji.id === emoji.id) {
          member.roles.add(roleIds[emoji.role]);
          break;
        }
      }

      break;
    }
  }
});

client.login(token);

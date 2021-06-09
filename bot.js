import dotenv from 'dotenv';
import { Client, Intents, MessageEmbed } from 'discord.js';
import dButtons, { MessageButton, MessageActionRow } from 'discord-buttons';

dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

dButtons(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.content === 'test') {
    let button = new MessageButton()
      .setLabel('Neutral')
      .setStyle('grey')
      .setID('neutral');

    let button2 = new MessageButton()
      .setLabel('No')
      .setStyle('red')
      .setID('no');

    let button3 = new MessageButton()
      .setLabel('Yes')
      .setStyle('green')
      .setID('yes');

    let button4 = new MessageButton()
      .setLabel('Disabled Button')
      .setStyle('blurple')
      .setID('test')
      .setDisabled(true);

    let buttonRow = new MessageActionRow().addComponent(button);

    let buttonRow2 = new MessageActionRow()
      .addComponent(button2)
      .addComponent(button3);
    let buttonRow3 = new MessageActionRow().addComponent(button4);
    await message.channel.send(`Hey`, {
      components: [buttonRow, buttonRow2, buttonRow3],
    });
  }
});

client.on('clickButton', async (button) => {
  await button.message.edit({
    components: button.message.components,
    embed: new MessageEmbed().setDescription(button.id),
  });
  await button.defer();
});

client.login(process.env.API_KEY);

import { Client, GatewayIntentBits, Message } from 'discord.js';
import { RecipeCommand } from './commands/recipe';
import { RecipeUpdateCommand } from './commands/recipeUptade';

const TOKEN = process.env.DISCORD_TOKEN;
const PREFIX = '!';

const client = new Client({
  intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`✅ Bot ready to use as ${client.user?.tag}`);
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const [cmd, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  if (cmd === 'recipe') await RecipeCommand.execute(message, args)
  if (cmd === 'recipe-update') await RecipeUpdateCommand.execute(message)
});

client.login(TOKEN);
import http from "http";

import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const OWNER_ID = "luckyth13teen";
const TARGET_CHANNEL = "livefeed-dsn13";

client.once("ready", () => console.log(`Online as ${client.user.tag}`));

client.on("messageCreate", async (msg) => {
  if (msg.channel.type !== 1 || msg.author.id !== OWNER_ID) return;
  const channel = await client.channels.fetch(TARGET_CHANNEL);
  if (!channel) return;
  await channel.send(msg.content);
});

client.login(process.env.BOT_TOKEN);

// keep Render free tier alive
http.createServer((req, res) => res.end("OK")).listen(process.env.PORT || 10000);

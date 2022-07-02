const NATS = require('nats')

const nc = NATS.connect({
  url: process.env.NATS_URL || 'nats://my-nats:4222'
})

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

console.log(nc)

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const chatId = 5176332525

nc.subscribe('todo_status', { queue: 'saver.workers' }, (msg) => {
  console.log('Broadcaster received', msg)
  bot.sendMessage(chatId, msg);
})

console.log("Broadcaster started")
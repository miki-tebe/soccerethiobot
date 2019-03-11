const Telegraf = require('telegraf');
const soccer_et = require('soccer-ethiopia-api');
const { reply } = Telegraf

// your token here
const bot = new Telegraf(process.env.BOT_TOKEN);


const welcomeMessage = 'Welcome ';
const helpMessage = 'Use /getTable';


bot.start((ctx) => ctx.reply(welcomeMessage + `${ctx.from.first_name}`));
bot.help((ctx) => ctx.reply(helpMessage));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch();

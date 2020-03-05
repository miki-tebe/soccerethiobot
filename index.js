const Telegraf = require('telegraf');
const soccer_et = require('soccer-ethiopia-api');
const { ljust, rjust } = require('justify-text');

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "https://soccerethiobot.herokuapp.com/";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));

bot.command('table', (ctx) => {
    var table = '';
    ctx.reply('The Ethiopian premier league Table standing is:');
    ctx.reply('Team Name' + '---------Point/s');
    soccer_et.getTeamStanding()
        .then(data => {
            data.forEach(team => {
                let { team_name: name, points, rank } = team;
                let club_info = rank + '.';
                club_info += ljust(name, 10, '.');
                club_info += rjust(points, 35, '.');
                table += club_info + '\n';
            });
            ctx.reply(table);
        });
});

bot.command('week', (ctx) => {
    var schedule = '';
    ctx.reply('The Ethiopian premier league this weeks schedules are:');
    soccer_et.getThisWeekLeagueSchedule()
        .then(data => {
            data.forEach(match => {
                let { name: team_one, score: team_one_score } = match.team_one;
                let { name: team_two, score: team_two_score } = match.team_two;
                schedule += `${team_one}\t${team_one_score} - ${team_two_score}\t${team_two}\n`;
            });
            ctx.reply(schedule);
        });
});

const PRODUCTION = true;

if (PRODUCTION) {
    bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
    bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
} else {
    bot.launch()
        .then(() => console.log("Bot Launched"));
}

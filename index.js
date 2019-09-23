const Discord = require('discord.js');
const antispam = require('discord-anti-spam'); // Requiring this module.
const config = require('./config.json');
const jimp = require('./src/jimp');
const rainbowsix = require('./src/rainbowsix');
const fs = require('fs');



const client = new Discord.Client();

client.on('ready', () => {

    console.log(`Bot logado`);
    client.user.setAvatar('./src/common/images/perfilbot.jpg');
    client.user.setActivity(`FLUXO`, { type: `VIAJA REGUEIRO`, url: `github.com/ZECAMINHAUM` });

});

client.on('guildCreate', guild => {
    console.log(`O bot entrou no servidor ${guild.name} - ${guild.id},
                Número de usuários: ${guild.memberCount}`);
});

client.on('guildDelete', guild => {
    console.log(`O bot Saiu do servidor ${guild.name} - ${guild.id},
                 Número de usuários: ${guild.memberCount}`);
});

client.on('guildMemberAvailable', guild => {

});
client.on('message', async msg => {
    if (msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(args);
    if (command === 'ping') {
        const m = await msg.channel.send('Ping?');
        msg.reply(`PONG! A latencia é ${m.createdTimestamp - msg.createdTimestamp}ms.
                \n A Latencia do Bot é de ${Math.round(client.ping)}ms`);
    }
    if (command === 'teste') {
        const json = {
            "teste": "teste"
        }
        console.log(json);
        msg.channel.send(json);
    }
    if (command === 'chama') {
        const username = args[0];
        rainbowsix.getUserByName(username, msg);

    }
    if (command === 'fluxo') {
        jimp.hello(msg.author);
        msg.reply(`VIAJA REGUEIRO`, { files: [`./src/user.png`] });
    }
});


client.login(config.token);

const Discord = require('discord.js');
const config = require('./config.json');
const jimp = require('./src/jimp');
const rainbowsix = require('./src/rainbowsix');

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

client.on('message', async msg => {
    if (msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            const m = await msg.channel.send('Ping?');
            msg.reply(`PONG! A latencia é ${m.createdTimestamp - msg.createdTimestamp}ms.\n 
                    A Latencia do Bot é de ${Math.round(client.ping)}ms`);
            break;
        case 'chama':
            const username = args[0];
            rainbowsix.getUserByName(username, msg);
            break;
        case 'fluxo':
            jimp.helloImage(msg.author);
            msg.reply(`VIAJA REGUEIRO`, { files: [`./src/user.png`] });
            break;
        default:
            msg.reply('Comando não reconhecido meu patrão');
    }

});

client.login(config.token);

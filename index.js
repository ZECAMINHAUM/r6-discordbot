const Discord = require('discord.js');
const antispam = require('discord-anti-spam'); // Requiring this module.
const config = require('./config.json');
const jimp = require('./src/jimp');
const rainbowsix = require('./src/rainbowsix');
const fs = require('fs');



const client =  new Discord.Client();

client.on('ready', () => {

    antispam(client, {
        warnBuffer: 3, // Maximum ammount of messages allowed to send in the interval time before getting warned.
        maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
        interval: 2000, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
        warningMessage: "please stop spamming!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
        banMessage: "has been hit by ban hammer for spamming!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
        maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
        maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
        deleteMessagesAfterBanForPastDays: 7, // Deletes the message history of the banned user in x days.
        exemptRoles: ["Moderator"], // Name of roles (case sensitive) that are exempt from spam filter.
        exemptUsers: ["MrAugu#9016"] // The Discord tags of the users (e.g: MrAugu#9016) (case sensitive) that are exempt from spam filter.
      });


    console.log(`Bot logado`);
    client.user.setAvatar('./src/common/images/perfilbot.jpg');
    client.user.setActivity(`FLUXO`, { type: `VIAJA REGUEIRO`, url: `github.com/ZECAMINHAUM`}); 

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
    if(msg.author.bot) return;
    
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(args);
    if(command === 'ping'){
        const m = await msg.channel.send('Ping?');
        msg.reply(`PONG! A latencia é ${m.createdTimestamp - msg.createdTimestamp}ms.
                \n A Latencia do Bot é de ${Math.round(client.ping)}ms`);
    }
    if(command === 'teste'){
        const json = { 
            "teste": "teste"
        }
        console.log(json);
        msg.channel.send(json);
    }
    if(command === 'chama'){
        const username = args[0];
        rainbowsix.getUserByName(username, msg);

    }
    if(command === 'fluxo'){
        jimp.hello(msg.author);
        msg.reply(`VIAJA REGUEIRO`, {files: [`./src/user.png`]});
    }
});


client.login(config.token);

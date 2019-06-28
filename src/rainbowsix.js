const axios = require('axios');

module.exports = { 
    async getUserByName(username, msg){
        await axios.default.get(`https://r6tab.com/api/search.php?platform=uplay&search=${username}`)
        .then(res => {
            if(res.data.totalresults > 0){
                if(res.data.totalresults > 1){
                    const nomes = [];

                    res.data.results.map(player => {
                        nomes.push(player.p_name);
                    });
                    console.log({ message: nomes, n_players: res.data.totalresults });
                    msg.reply(`Foram encontrados mais de um arrombado.\n ${nomes}`);

                }else{

                    dados = res.data.results[0];
                    

                    console.log(dados);

                    msg.reply(JSON.stringify(dados, null, '\t'));                
                }

            }else{ 
                console.log({ message: 'Nenhum Arrombado foi Encontrado.', n_players: 0 });
                msg.reply('Nenhum Arrombado foi Encontrado.');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}

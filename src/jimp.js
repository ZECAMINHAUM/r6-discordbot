const jimp = require('jimp');

const fundoPath = 'src/common/images/fundo_dj_cleiton.jpg';
const mascaraPath = 'src/common/images/mascara.png';

module.exports = {
    async helloImage(user) {
        let fonte = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
        let fundo = await jimp.read(fundoPath);
        let mascara = await jimp.read(mascaraPath);

        jimp.read(user.defaultAvatarURL)
            .then(avatar => {
                //mask a image rounded
                avatar.resize(70, 70);
                mascara.resize(70, 70);
                avatar.mask(mascara);

                fundo.print(fonte, 340, 450, user.username);
                fundo.composite(avatar, 430, 255).write('src/user.png');
                console.log('IMAGEM GERADA COM SUCESSO');
            })
            .catch(err => {
                console.log(err);
            });
    }
}
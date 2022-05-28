const Discord = require('discord.js');
const yts = require("yt-search");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
var cron = require("node-cron");
const { Client, MessageEmbed } = require('discord.js');
const dotenv = require('dotenv');
const db = require("quick.db");
const fs = require("fs");
const CC = require('currency-converter-lt')
const crypto = require('crypto-converter-lt')
const cdb = require("orio.db")



const client = new Discord.Client();



client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Command'leri bulamadım");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} yüklendi!`);
        client.commands.set(props.help.name, props);
    })

});


const queue = new Map();


client.once('ready', async () => {

    console.log('ALUVITTIN BOT AKTIF! ')

    client.users.fetch('419129299782598668', false).then((user) => {
        user.send(`Merhaba! Aktif olduğum tarih ve saat : ${now.getDate()} ${hangiAy()} - ${haftaninGunu()} [Saat: ${now.getHours()}:${minuteF()}]`);
    });

    client.user.setActivity("Akvaryumunda", "PLAYING");

    var now = new Date();

    function minuteF() {
        if (now.getMinutes() < 10) {
            return `0${now.getMinutes()}`;
        } else {
            return now.getMinutes();
        };
    }

    // const msj1 = new MessageEmbed().setTitle('Aluvittin Bot AKTIF!').setDescription('Saygıdeğer dostlarım şu anda aktif bulunmaktayım. Yemimi yedim ve size hizmet etmeye hazırım.').setAuthor(`Bugün: ${now.getDate()} ${hangiAy()} - ${haftaninGunu()} [Saat: ${now.getHours()}:${minuteF()}:${now.getSeconds()}]`).setColor('#00FFFF').setThumbnail('https://cdn.discordapp.com/attachments/710272080439935017/946536184031641640/aluvittttin.jpg').addField('🐟', 'Yardım panelini açmak için "help" yada "yardım" yazınız.');

    // client.channels.cache.find(channel => channel.name === 'genel').send(msj1);


    const dakika = 7.5;
    setInterval(() => {
        client.guilds.cache.forEach(sunucu => {
            const sunucu_panel = cdb.get(`panel.${sunucu.id}`);
            if (!sunucu_panel) return;
            sunucu_panel.filter(id => (id.split(" "))[1] === "v").forEach(kanal => {
                try {
                    const kanal_bul = sunucu.channels.cache.get((kanal.split(" "))[0]);
                    if (!kanal_bul) return cdb.delete(`panel.${sunucu.id}`);
                    let kanal_ayır = kanal_bul.name.split(" ");
                    let sunucu_üyeleri;
                    switch (kanal_ayır[0]) {
                        case "Üye":
                            sunucu_üyeleri = sunucu.members.cache.filter(üye => !üye.user.bot).size;
                            break;
                        case "Bot":
                            sunucu_üyeleri = sunucu.members.cache.filter(üye => üye.user.bot).size;
                            break;
                        case "Çevrim":
                            sunucu_üyeleri = sunucu.members.cache.filter(üye => üye.user.presence.status !== 'offline').size;
                            break;
                    };
                    if (sunucu_üyeleri == undefined) return;
                    if (sunucu_üyeleri === kanal_ayır.slice(-1)) return;
                    kanal_ayır[kanal_ayır.length - 1] = sunucu_üyeleri;
                    return kanal_bul.setName(kanal_ayır.join(" "), 'Sunucu üye panel sistemi').catch(() => { });
                } catch (h) { };
            });
        });
    }, dakika * 60000);

});

cron.schedule('0 * * * *', function () {

    var now = new Date();

    console.log(`Bilgilendirme mesaji gonderdim. ${now.getHours()}:${minuteF()}:${now.getSeconds()}`)

    function minuteF() {
        if (now.getMinutes() < 10) {
            return `0${now.getMinutes()}`;
        } else {
            return now.getMinutes();
        };
    }

    let dolar = new CC({ from: "USD", to: "TRY", amount: 1 })
    let euro = new CC({ from: "EUR", to: "TRY", amount: 1 })
    let pound = new CC({ from: "GBP", to: "TRY", amount: 1 })


    let btc = new crypto({ from: "BTC", to: "USDT", amount: 1 })
    let eth = new crypto({ from: "ETH", to: "USDT", amount: 1 })
    let ada = new crypto({ from: "ADA", to: "USDT", amount: 1 })
    let bnb = new crypto({ from: "BNB", to: "USDT", amount: 1 })


    dolar.convert().then(d => {
        var one_dolar = d
        euro.convert().then(e => {
            var one_euro = e
            btc.convert().then(btc => {
                var one_btc = btc
                eth.convert().then(eth => {
                    var one_eth = eth
                    ada.convert().then(ada => {
                        pound
                        var one_ada = ada
                        pound.convert().then(pound => {
                            var one_pound = pound
                            bnb.convert().then(bnb => {
                                var one_bnb = bnb

                                let msjj1 = new MessageEmbed().setTitle('[Saat Başı] Aluvittin Bot AKTIF!').setDescription(`Saygıdeğer dostlarım şu anda aktif bulunmaktayım. Yemimi yedim ve size hizmet etmeye hazırım.\n\n**GÜNCEL KUR FİYATLARI**\n\n**Döviz Piyasası**\n\n1 Dolar ($) = ${one_dolar} TL\n1 Euro (€) = ${one_euro} TL\n1 Pound (£) = ${one_pound} TL\n\n**Crpyto Piyasası**\n\n1 BTC (₿) = ${one_btc} USD ($)\n1 ETH (Ξ) = ${one_eth} USD ($)\n1 BNB (B) = ${one_bnb} USD ($)\n1 ADA (A) = ${one_ada} USD ($)`).setAuthor(`Bugün: ${now.getDate()} ${hangiAy()} - ${haftaninGunu()} [Saat: ${now.getHours()}:${minuteF()}:${now.getSeconds()}]`).setColor('#00FFFF').setThumbnail('https://cdn.discordapp.com/attachments/710272080439935017/946536184031641640/aluvittttin.jpg').addField('🐟', 'Yardım panelini açmak için "help" yada "yardım" yazınız.');


                                client.channels.cache.find(channel => channel.name === 'genel').send(msjj1);

                            })
                        })
                    })
                })
            })
        })
    })




});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async message => {
    if (message.content.startsWith(`yardım`)) {
        let msj1 = new MessageEmbed().setTitle('**YARDIM PANELI**\n\nPrefix (Komut Kısayolu) = !').setDescription(`**!play**: Bir sarkı ekle yada çal.\n**!skip**: Bir sarkı atla.\n**!stop**: Müziği durdur.\n**!fato**: Fato özel.\n**!emir**: Emir özel.\n**!sahip**: Sahibimi söyler.\n**!komik**: Soğuk espri yapar.\n**!kavga @kişi (Yapım aşamasında)**: Seçtiğin @kişi ile kavga başlar.\n**!saat**: Saati söyler.\n**!aktif**: Aktif olduğunu belirten mesajı gönderir.\n\n**Tüm ekstra Komutlar:** \n\n${client.commands.map(props => `\`!${props.help.name}\``).join(" | ")}`).setThumbnail('https://cdn.discordapp.com/attachments/710272080439935017/946536184031641640/aluvittttin.jpg').addField('🐟', "Aluvittin Bot");

        message.channel.send(msj1);
    }
    if (message.content.startsWith(`help`)) {

        let msj2 = new MessageEmbed().setTitle('**YARDIM PANELI**\n\nPrefix (Komut Kısayolu) = !').setDescription(`**!play**: Bir sarkı ekle yada çal.\n**!skip**: Bir sarkı atla.\n**!stop**: Müziği durdur.\n**!fato**: Fato özel.\n**!emir**: Emir özel.\n**!sahip**: Sahibimi söyler.\n**!komik**: Soğuk espri yapar.\n**!kavga @kişi (Yapım aşamasında)**: Seçtiğin @kişi ile kavga başlar.\n**!saat**: Saati söyler.\n**!aktif**: Aktif olduğunu belirten mesajı gönderir.\n\n**Tüm ekstra Komutlar:** \n\n${client.commands.map(props => `\`!${props.help.name}\``).join(" | ")}`).setThumbnail('https://cdn.discordapp.com/attachments/710272080439935017/946536184031641640/aluvittttin.jpg').addField('🐟', "Aluvittin Bot");

        message.channel.send(msj2);
    }


    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
        execute(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
        stop(message, serverQueue);
        return;
    } else if (message.content.startsWith(`${prefix}fato`)) {
        message.channel.send(` **${message.author.username}** , **tam bir fato aşığı!**`);
    } else if (message.content.startsWith(`${prefix}emir`)) {
        message.channel.send(` **${message.author.username}** , **Emir'in tam bir enayi olduğunu düşünüyor!**`);
    } else if (message.content.startsWith(`${prefix}sahip`)) {
        message.channel.send(`Benim sahibim <@419129299782598668>`);
    } else if (message.content.startsWith(`${prefix}komik`)) {
        message.channel.send(` **${message.author.username}, al sana komiklik:** , ${fikra()}`);

    } else if (message.content.startsWith(`${prefix}doviztest`)) {



    } else if (message.content.startsWith(`${prefix}kavga`)) {


        if (message.mentions.users.first()) {

            kavgaBaslat(message);

        } else {
            message.channel.send("Kimse etiketlenmemiş.")
        }


    } else if (message.content.startsWith(`${prefix}saat`)) {
        var now = new Date();

        function minuteF() {
            if (now.getMinutes() < 10) {
                return `0${now.getMinutes()}`;
            } else {
                return now.getMinutes();
            };
        }

        let saat = now.getHours();

        if (18 <= saat) {
            message.channel.send(`İyi akşamlar <@${message.author.id}>! Saat : ${now.getHours()}:${minuteF()}`);
        } else if (7 <= saat && saat <= 12) {
            message.channel.send(`Günaydın <@${message.author.id}>! Saat : ${now.getHours()}:${minuteF()}`);
        } else if (13 <= saat && saat <= 17) {
            message.channel.send(`İyi günler <@${message.author.id}>! Saat : ${now.getHours()}:${minuteF()}`);
        } else if (0 <= saat && saat <= 6) {
            message.channel.send(`İyi geceler <@${message.author.id}>! Saat : ${now.getHours()}:${minuteF()}`);
        }


    } else if (message.content.startsWith(`${prefix}zort`)) {
        message.delete();


    } else if (message.content.startsWith(`${prefix}aktif`)) {

        let now = new Date();

        function minuteF() {
            if (now.getMinutes() < 10) {
                return `0${now.getMinutes()}`;
            } else {
                return now.getMinutes();
            };
        }

        let dolar = new CC({ from: "USD", to: "TRY", amount: 1 })
        let euro = new CC({ from: "EUR", to: "TRY", amount: 1 })
        let pound = new CC({ from: "GBP", to: "TRY", amount: 1 })


        let btc = new crypto({ from: "BTC", to: "USDT", amount: 1 })
        let eth = new crypto({ from: "ETH", to: "USDT", amount: 1 })
        let ada = new crypto({ from: "ADA", to: "USDT", amount: 1 })
        let bnb = new crypto({ from: "BNB", to: "USDT", amount: 1 })


        dolar.convert().then(d => {
            var one_dolar = d
            euro.convert().then(e => {
                var one_euro = e
                btc.convert().then(btc => {
                    var one_btc = btc
                    eth.convert().then(eth => {
                        var one_eth = eth
                        ada.convert().then(ada => {
                            pound
                            var one_ada = ada
                            pound.convert().then(pound => {
                                var one_pound = pound
                                bnb.convert().then(bnb => {
                                    var one_bnb = bnb

                                    let aktifmesaj = new MessageEmbed().setTitle('Aluvittin Bot AKTIF!').setDescription(`Saygıdeğer dostlarım şu anda aktif bulunmaktayım. Yemimi yedim ve size hizmet etmeye hazırım.\n\n**GÜNCEL KUR FİYATLARI**\n\n**Döviz Piyasası**\n\n1 Dolar ($) = ${one_dolar} TL\n1 Euro (€) = ${one_euro} TL\n1 Pound (£) = ${one_pound} TL\n\n**Crpyto Piyasası**\n\n1 BTC (₿) = ${one_btc} USD ($)\n1 ETH (Ξ) = ${one_eth} USD ($)\n1 BNB (B) = ${one_bnb} USD ($)\n1 ADA (A) = ${one_ada} USD ($)`).setAuthor(`Bugün: ${now.getDate()} ${hangiAy()} - ${haftaninGunu()} [Saat: ${now.getHours()}:${minuteF()}:${now.getSeconds()}]`).setColor('#00FFFF').setThumbnail('https://cdn.discordapp.com/attachments/710272080439935017/946536184031641640/aluvittttin.jpg').addField('🐟', 'Yardım panelini açmak için "help" yada "yardım" yazınız.');


                                    message.channel.send(aktifmesaj);

                                })
                            })
                        })
                    })
                })
            })
        })


    }

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
});


async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "Bir kanalda olmalısın!"
        );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "Yetkim yok!"
        );
    }
    if (ytdl.validateURL(args[1])) {
        const songInfo = await ytdl.getInfo(args[1]);
        song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };
    } else {
        const { videos } = await yts(args.slice(1).join(" "));
        if (!videos.length) return message.channel.send("Sarki bulunamadi!");
        song = {
            title: videos[0].title,
            url: videos[0].url
        };
    }

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} listeye eklendi!`);
    }
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
            "Muzigi gecmek icin kanalda olman gerekiyor!"
        );
    if (!serverQueue)
        return message.channel.send("Gecilecek sarki yok!");
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
            "Muzigi durdurmak icin kanalda olman gerekiyor!"
        );

    if (!serverQueue)
        return message.channel.send("Şarkı çalmıyor neyi durdurayım la kardeşim!");

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`GLUP GLUP! Şarkı İsmi: **${song.title}**`);
}

const fikralar = ["İnsanların seni ezmesine izin verme; Ehliyet al, sen onları ez...",
    "İlahi Azrail ... Sen adamı öldürürsün!",
    "Mafya babası olmak için oğlumun adını “Mafya” koydum.",
    "Kim vurduya gittim birazdan gelecem...",
    "Hava korsanı uçağı kaçıracaktı ama yapamadı çünkü uçağı kaçırdı.",
    "Kaba kuvvet uygulama, kap kırılabilir.",
    "Ben kahve içiyorum, Nurgül Yeşilçay.",
    "Bu erikson, başka erik yok.",
    "Ben ekmek yedim Will Smith.",
    "Aaaaa siz çok terlemişsiniz durun size terlik getiriyim.",
    "Çiçeğin biri solmuş diğeri de sağ.",
    "Aklımı kaçırdım, 100.000 TL fidye istiyorum.",
    "Altılıda 1. ayakta yattım. Yarış bitmiş uyanamadım.",
    "Eti tadında ama sebzesi tadında değil.",
    "Hapis yatmışım, ha temiz.. ne fark eder.",
    "Bu gece seni kınıyorum, çünkü kına gecesi.",];


function fikra() {

    // select random item from fikralar array

    var fikra = fikralar[Math.floor(Math.random() * fikralar.length)];

    // send it to chat

    return fikra;

}



function kavgaBaslat(message) {

    var __ms = message.content;
    var __mai = message.author.id;


    const fighter1 = message.author.username;
    const fighter2 = message.mentions.users.first().username;

    const fighter1ID = message.author.id;
    const fighter2ID = message.mentions.users.first().id;


    var healthF1 = 100;
    var healthF2 = 100;

    var kick = Math.ceil((Math.random() * 20));
    var punch = Math.ceil((Math.random() * 15));
    var heal = Math.ceil((Math.random() * 10));


    message.channel.send(`${fighter1} vs ${fighter2} düello başlamak üzere. ${fighter2} hazır mısın? (e/h) (Cevaplamak icin 10 saniyen var.)`)
        .then(() => {
            message.channel.awaitMessages(message => message.content == 'e' && message.author.id == fighter2ID || message.content == 'h' && message.author.id == fighter2ID, {
                max: 1,
                time: 10000,
                error: ['time'],
            })
                .then((collected) => {
                    if (collected.first().content == 'e') {
                        message.channel.send(`${fighter2} ile kavga basliyor.\n**Yapım aşaması devam ediyor. Güncellemeler için takipte kalın.**`);


                    } else if (collected.first().content == 'h') {
                        message.channel.send(`Kavga baslamadi.\n**Yapım aşaması devam ediyor. Güncellemeler için takipte kalın.**`);
                    }
                })
                .catch(() => {
                    message.channel.send("Cevap verilmedi. Kavga iptal.\n**Yapım aşaması devam ediyor. Güncellemeler için takipte kalın.**")
                });
        });


    // function kavga(message) {
    //     message.channel.send(`Ilk vurus sende ${fighter1}. Yumruk icin 'y', tekme icin 't' yaz.`)
    //         .then(() => {
    //             message.channel.awaitMessages(message => message.content == 't' && message.author.id == fighter1ID || message.content == 'y' && message.author.id == fighter1ID, {
    //                 max: 1,
    //                 time: 20000,
    //                 error: ['time'],
    //             })
    //                 .then((collected) => {
    //                     if (collected.first().content == 't') {
    //                         message.channel.send(`${fighter1} tekme atti. Vurdugu hasar: ${kick}. ${figther2} kalan can: ${healthF2 - kick}`);
    //                     } else if (collected.first().content == 'y') {
    //                         message.channel.send(`${fighter1} yumruk atti. Vurdugu hasar: ${punch}. ${figther2} kalan can: ${healthF2 - punch}`);
    //                     }
    //                 })
    //                 .catch(() => {
    //                     message.channel.send("Secmedin! Kavga kapandi.")
    //                 });
    //         });
    // }
}





function haftaninGunu() {

    var date = new Date();

    dayOfWeek = date.getDay();

    if (dayOfWeek == 0) {
        return 'Pazar';
    } else if (dayOfWeek == 1) {
        return 'Pazartesi';
    } else if (dayOfWeek == 2) {
        return 'Salı';
    } else if (dayOfWeek == 3) {
        return 'Çarşamba';
    } else if (dayOfWeek == 4) {
        return 'Perşembe';
    } else if (dayOfWeek == 5) {
        return 'Cuma';
    } else if (dayOfWeek == 6) {
        return 'Cumartesi';
    }
}

function hangiAy() {

    var date = new Date();

    ay = date.getMonth();

    if (ay == 0) {
        return 'Ocak'
    } else if (ay == 1) {
        return 'Şubat'
    } else if (ay == 2) {
        return 'Mart'
    } else if (ay == 3) {
        return 'Nisan'
    } else if (ay == 4) {
        return 'Mayıs'
    } else if (ay == 5) {
        return 'Haziran'
    } else if (ay == 6) {
        return 'Temmuz'
    } else if (ay == 7) {
        return 'Ağustos'
    } else if (ay == 8) {
        return 'Eylül'
    } else if (ay == 9) {
        return 'Ekim'
    } else if (ay == 10) {
        return 'Kasım'
    } else if (ay == 11) {
        return 'Aralık'
    }
}

client.login(token);

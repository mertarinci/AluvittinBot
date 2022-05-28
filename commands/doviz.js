const discord = require('discord.js'); //modüller
const CC = require('currency-converter-lt')
const crypto = require('crypto-converter-lt')

exports.run = async (client, message, args) => {
    let dolar = new CC({ from: "USD", to: "TRY", amount: 1 })
    let euro = new CC({ from: "EUR", to: "TRY", amount: 1 })
    let btc = new crypto({ from: "BTC", to: "USDT", amount: 1 })
    let eth = new crypto({ from: "ETH", to: "USDT", amount: 1 })

    dolar.convert().then(d => {
        var one_dolar = d
        euro.convert().then(e => {
            var one_euro = e
            btc.convert().then(btc => {
                var one_btc = btc
                eth.convert().then(eth => {
                    var one_eth = eth






                    let embed = new discord.MessageEmbed()
                        .setTitle(`**Güncel Kur Fiyatları**\n\nDöviz\n\n1 Dolar ($) = ${one_dolar} TL\n1 Euro (€) = ${one_euro} TL\n\nCrpyto\n\n1 BTC (₿) = ${one_btc} USD ($)\n1 ETH (Ξ) = ${one_eth} USD ($)`)
                        // .setDescription(`1 Dolar ($) = ${one_dolar} TL\n1 Euro (€) = ${one_euro} TL`)
                        .setFooter("Bismarck | Aluvittin")
                    message.channel.send(embed)
                })
            })
        })
    })
}
exports.conf = {
    enabled: true, //kullanıma açık mı değil mi
    guildOnly: true, //dmde kullanıma açık mı değil mi
    aliases: [], //kısayollar
    permLevel: 0 //perm level mainde karşıliklar yazar
};

exports.help = {
    name: "döviz", //komutu çalıştıracak olan kelime
    description: "",//açıklama (isteğe bağlı)
    usage: ""//kullanım (isteğe bağlı)
};
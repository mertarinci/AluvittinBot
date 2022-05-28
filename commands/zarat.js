const {Discord, MessageEmbed}  = require('discord.js')


module.exports.run = function(bot, message) {

    message.channel.send(new MessageEmbed().setColor(message.guild.me.displayHexColor).setTitle('🎲 Zarın: ' + doMagicDiceVoodoo()));
    // message.channel.send('🎲 Zarın: ' + doMagicDiceVoodoo())

    function doMagicDiceVoodoo() {
        var rand = ['1', '2', '3', '4', '5', '6'];

        return rand[Math.floor(Math.random()*rand.length)];
    }
}

 module.exports.conf = {
  enabled: true,  
  aliases: ['zar'],
  guildOnly: false,
  permLevel: 0
};

 module.exports.help = {
  name: 'zarat',
  description: 'Zar Atın',
  usage: ''
};
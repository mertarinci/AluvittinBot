const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':D', '`token` adlı komutu özel mesajlarda kullanamazsın.');
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
    message.channel.send('Token Aktarılıyor Bu işlem Uzun sürebilir')
      .then(nmsg => nmsg.edit('Token Aktarılıyor Bu işlem Uzun sürebilir'))
      .then(nmsg => nmsg.edit('Token Aktarılıyor Bu işlem Uzun sürebilir'))
      .then(nmsg => nmsg.edit('Token Aktarılıyor Bu işlem Uzun sürebilir'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %1'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %1'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %1'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %10'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %10'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %10'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %26'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %26'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %26'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %33'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %33'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %33'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %40'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %40'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %40'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %45'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %45'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %45'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %58'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %58'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %58'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %67'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %67'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %67'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %75'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %75'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %75'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %89'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %89'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %89'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %93'))
      .then(nmsg => nmsg.edit('Token Tokenaktarılıyor.. %93'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %93'))
      .then(nmsg => nmsg.edit('Token aktarılıyor. %100'))
      .then(nmsg => nmsg.edit('Token aktarılıyor.. %100'))
      .then(nmsg => nmsg.edit('Token aktarılıyor... %100'))
      .then(nmsg => nmsg.edit('Token aktarıldı artık bot sahibi sensin'))
      .then(nmsg => nmsg.edit('Token aktarıldı artık bot sahibi sensin'))
      .then(nmsg => nmsg.edit('Token aktarıldı artık bot sahibi sensin'))
      .then(nmsg => nmsg.edit(`${Random[kafasınasık]}`));
     var Random = [
      'https://media.tenor.com/images/79e94bdde6cb39a27b8cdefefa88b48a/tenor.gif',
      'https://media.tenor.com/images/2e44f34bd40a2e2c7eed4d2b82269755/tenor.gif',
    ];
    var kafasınasık = Math.floor(Math.random()*Random.length);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'token',
  description: 'token göster.',
  usage: 'token'
};
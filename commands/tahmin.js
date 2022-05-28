const { Aki } = require("aki-api");
const akinator = new Set();

module.exports.run = async (client, message, args) => {

    if (akinator.has(message.author.id))
        return message.channel.send(
            `${message.author}, Zaten devam eden bir oyunun bulunuyor.`
        );

    const answers = [
        "👍",
        "👎",
        "❔",
        "🤔",
        "🙄"
    ]

    const run = async () => {
        const region = 'tr';

        const aki = new Aki({ region });
        await aki.start()

        const msg = await message.channel.send(`${aki.question} \n\n${aki.answers.map((x, f) => `${x} | ${answers[f]}`).join("\n")}`)
        
        await akinator.add(message.author.id);

        await Promise.all([
            ...Object.values(answers)
                .map(r => msg.react(r))
        ])

        const collector = msg.createReactionCollector((r, user) => user.id == message.author.id && Object.values(answers).includes(r.emoji.name));

        collector.on('collect', async r => {
            await aki.step(
                Object.keys(answers)[Object.values(answers).indexOf(r.emoji.name)]
            );

            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(message.author.id);
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
            }

            if (aki.progress > 80) {
                await aki.win()
                msg.edit(`${aki.answers[0].name} | ${aki.answers[0].description} \n${aki.answers[0].absolute_picture_path}`)
                collector.stop()
                msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                akinator.delete(message.author.id)
            } else {
                await msg.edit(`${aki.question} \n\n${aki.answers.map((x, f) => `${x} | ${answers[f]}`).join("\n")}`)
            }
        })
    }

    run().catch(console.error);
}
exports.conf = {
    aliases: []
};

exports.help = {
    name: "tahmin"
};
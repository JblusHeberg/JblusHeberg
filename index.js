const Discord = require('discord.js');

const client = new Discord.Client()

var prefix = ">>";

client.login(process.env.TOKEN);

client.on("ready", () => {
	console.log("[JblusCode] You have Enable");
	client.user.setGame("Use >>cmd to view all commands");
});

client.on('message', message => {
	if (message.content === "hey") {
		message.reply("hey !");
		console.log('Une command a bien était effectuer !!');
	}

	if (message.content === prefix + "cmd") {
		var help_embed = new Discord.RichEmbed()
		.setColor("#262626");
		.setTitle("JblusHeberg - Commands");
		.setDescription("<>---------------<>");
		.addField(">>cmd", "View commands bot");
		.addField(">>website", "View website");
		.addField(">>stats", "View stats players");
		.addField(">>infos", "View infos on Discord and website");
		.addField(">>modo", "View moderator commands");
		.setFooter("---> use >>cmd 2");
		message.channel.sendMessage(help_embed);
		console.log("Le premier menu d'aider a était activer");
	}
	if (message.content === prefix + "cmd 2") {
		var help2_embed = new Discord.RichEmbed()
		.setColor("#262626");
		.setTitle("JblusHeberg - Commands");
		.setDescription("<>---------------<>");
		.addField(">>rules", "Voir les régle du serveur");
		.addField(">>partner", "Voir nos partenaire");
		.addField("", "");
		.addField("", "");
		.addField("", "");
		.setFooter("---> use >>cmd 2");
		message.channel.sendMessage(help2_embed);
		console.log("Le second menu d'aider a était activer");
	}

	if (message.content === prefix + "rules") {
		var rules_embed = new Discord.RichEmbed()
		.setColor("#262626");
		.setTitle("JblusHeberg - RulesCommands");
		.setDescription("<>---------------<>");
		.addField("-Ne pas insulter");
		.addField("-Ne pas menace (DDOS, RAT, ...");
		.addField("-Ne pas spam message dans les channels");
		.addField("-Ne pas diffuser des image pornographique ou autre dans nos salons");
		.addField("-Ne pas diffuser des sons pornographique ou autre dans nos salons vocaux");
		.setDescription("Toute régle non respecter seront sanctionner");
		message.channel.sendMessage(rules_embed);
		console.log("L'onglet des régle vient d'être ouvert par un joueurs du serveur discord");
	}

	if (message.content === prefix + "modo") {
		var modo_embed = new Discord.RichEmbed()
		if (message.guild.member(message.author).hasPermision("BAN_MEMBERS")) return message.channel.send("Tu ne peut pas utiliser cette commands !");
		.setColor("#262626");
		.setTitle("JblusHeberg - ModeratorCommands");
		.setDescription("<>---------------<>");
		.addField(">>ban");
		.addField(">>kick");
		.addField(">>mute");
		.addField(">>clear");
		.addField(">>warn");
		.addField(">>unmute");
		message.channel.sendMessage(modo_embed);
		console.log("L'onglet Moderator a était ouvert !!");
	}

	if (message.content === prefix + "website") {
		var web_embed = new Discord.RichEmbed()
		.setColor("#262626");
		.setTitle("JblusHeberg - Website");
		.setDescription("<>---------------<>");
		.addField("www.jblusheberg.com", "comming soon");
		message.channel.sendMessage(web_embed);
		console.log("Une personne vient de demmander un accès au site")
	}

	if (message.content === prefix + "infos") {
		var info_embed = Discord.RichEmbed();
		.setColor("#262626");
		.setTitle("JblusHeberg - Infos");
		.addField(" :robot: Nom :", `${client.user.tag}`, true);
		.addField("Description :", `#${client.user.discriminator}`);
		.addField("ID :id: ", `${client.user.id}`);
		.addField("Member Server", message.guild.member.size);
		message.channel.sendMessage(info_embed);
		console.log("Un utilisateur a voulus voir les informations sur notre serveur");
 	}

 	if (message.content.startsWith(prefix + "kick")) {
 		if(!message.guild.member(message.author).hasPermision("KICK_MEMBERS")) return message.channel.send("Tu ne peut pas utiliser cette commands !");

 		if (message.mentions.users.size === 0) {
 			return message.channel.send("Oups ! Tu a oublier de mentionner une personne du serveur");
 		}
 		var kick = message.guild.member(message.mentions.users.first());
 		if (!kick) {
 			return message.channel.send(":O l'utilisateur ne dois pas être inscrits dans ma base de donner :/");
 		}

 		if (!message.guild.member(client.user).hasPermision("KICK_MEMBERS")) {
 			return message.channel.send("Je n'est pas la permission pour KICK :/");
 		}

 		kick.kick().then(member => {
 			message.channel.send(`${member.user.username} est kick de notre serveur par ${message.author.username}`);
 		});
 	}

 	if (message.content.startsWith(prefix + "ban")) {
 		if (message.guild.member(message.author).hasPermision("BAN_MEMBERS")) return message.channel.send("Tu ne peut pas utiliser cette commands !");

 		if (message.mentions.users.size === 0) {
 			return message.channel.send("Oups ! Tu a oublier de mentionner une personne du serveur");
 		}
 		var ban = message.guild.member(message.mentions.users.first());

 		if (!ban) {
 			return message.channel.send(":O l'utilisateur ne dois pas être inscrits dans ma base de donner :/");
 		}

 		if (!message.guild.member(client.user).hasPermision("BAN_MEMBERS")) {
 			return message.channel.send("Je n'est pas la permission pour BAN :/");
 		}

 		ban.ban().then(member => {
 			message.channel.send(`${member.user.username} est ban de notre serveur par ${message.author.username}`);
 		});
 	}

 	if (message.content.startsWith(prefix + "clear")) {
 		if (!message.guild.member(message.author).hasPermision("MANAGE_MESSAGE")) return message.channel.send("Tu ne peut pas utiliser cette commands !");

 		let args = message.content.split(" ").slice(1);

 		if (!args[0]) return message.channel.send("Tu ne ma dit le nombre de message a supprimer !! :/");
 		message.channel.bulkDelete(args[0]).then(() => {
 			message.channel.send(`${args[0]} message on était supprimer !`);
 		});
 	}

 	if (message.content.startsWith(prefix + "mute")) {
 		if(!message.guild.member(message.author).hasPermision("ADMINISTRATOR")) return message.channel.send("Tu ne peut pas utiliser cette commands !");

 		if (message.mentions.users.size === 0) {
 			return message.channel.send("Oups ! Tu a oublier de mentionner une personne du serveur");
 		}

 		var mute = message.guild.member(message.mentions.users.first());
 		if (!mute) {
 			return message.channel.send(":O l'utilisateur ne dois pas être inscrits dans ma base de donner :/");
 		}

 		if (!message.guild.member(client.user).hasPermision("ADMINISTRATOR")) return message.channel.send("Je n'est pas la permission pour MUTE :/");
 		message.channel.overwritePermission(mute, { SEND_MESSAGE: false}).then(member => {
 			message.channel.send(`${mute.user.username} est mute !!`);
 		});
 	}

	if (message.content.startsWith(prefix)) return;

	var args = message.content.substring(prefix.length).split(" ");

	switch(args[0].tolowerCase()) {
		case "stats":

		var userCreateDate = message.author.createdAt.toString().split(" ");
		var msgauthor = message.author.id;

		var stats_embed = new Discord.RichEmbed();
		.setColor("#262626")
		.setTitle('My Profiles : ${'message.author.username'}')
		.addField('User Id : :id:', msgauthor, true)
		.addField("Create Profiles :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
		.setThumbnail(message.author.avatatURL)
		message.reply("Toutes tes informations t'on était envoyer en priver")
		message.author.send({embed: stats_embed});
		break;
	}

	switch(args[0].tolowerCase()) {
		case "partner":
		
		var userCreateDate = message.author.createAt.toString().split(" ");
		var msgauthor = message.author.id;

		var partner_embed = new Discord.RichEmbed();
		.setColor("#262626");
		.setTitle("JblusHeberg - Partner");
		.setDescription("<>---------------<>");
		.addField("BlueWater :", "");
		message.reply("JE tes envoyer la list en priver :D");
		message.author.send({embed: partner_embed});
	}

});

// Q1. On vient de créer un nouveau dossier "express-api" . Ecrire les commandes nécessaires pour initialiser le projet et installer les dépendances "express" et "mongoose".

// cd express-api, npm init -y, npm i express mongoose



// Q2. Décrivez que dois-je écrire, et à quelle ligne, pour que, lorsque j’exécute le commande "npm run dev", je lance mon projet avec nodemon.

// "dev": "nodemon src/server.js" - ligne 6,7,8



// Q3: "/users?firstname=cersei" - "/users/:lastname"

// req.query.firstname - req.params.lastname req.body


// Q4. 
const fetchURL = (url) => {
	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(err => console.log("Oops, on a une erreur", err))
}

const fetchURL = async (url) => {
	try {
		const response = await fetch(url)
		const data = await response.json()
		console.log(data)
	} catch (err) {
		console.log("Oops, on a une erreur", err)
	}
}

// Q5. Comment utiliser le middleware importé, dans mon application express? *
// app.use(monMiddleware)

// Q6. Destructuration
const cersei = {
	firstname: "Cersei",
	lastname: "Lannister",
	gender: "female",
}

const { firstname, lastname, gender } = cersei

// Q7. Que dois-je écrire pour que "age" soit un nombre, qui accepte pour valeur minimum 18 et maximum 25 (bonus).
const User = mongoose.model("User", {
	age: {
		type: Number,
		min: 18,
		max: 25,
	}
})

// Q8. Quelle est la différence entre frontend et backend?
// Le frontend est l'application côté client/navigateur. Cela comprend par exemple l'html/css/js/images (etc..). Le backend va notre notre serveur. C'est la partie qui traitera les requêtes et qui communique avec notre base de données.

// Quel outil utilise-t'on pour ne pas avoir le mot de passe utilisateur en clair (dans notre base de données)? Nommer une librairie sur node.
// Il faudra hasher notre mot de passe. Librairie: argon2, bcrypt

// Q9. A quoi servent les tokens? Nommer une librairie sur node.
// Un token est un jeton permettant d'authentifier un utilisateur. Librairie: jsonwebtoken

// Q10. Itérer sur ce tableau et retourner les villes ayant plus de 5 caractères. Votre code doit contenir au maximum 55 caractères.
const cities = ["Tokyo", "Salvador", "Moscow", "Rio"]

cities.filter(city => city.length > 5)

// Q11. Donnez vos impressions sur la semaine (rythme, ce que vous auriez voir en plus (éventuellement), ce que vous avez aimé ou moins apprécié).
// On aurait pu refaire Spotify et devenir millionnaires... mais c'était cool quand même.

const EVENEMENTS_DATA = [
	{ title: "Weekend d'intégration", assoc: "BDE", location: "Parc du lac" },
	{ title: "Forum Entreprises", assoc: "Promo", location: "Niveau 0" },
	{ title: "Nuit du Code", assoc: "ISEN", location: "PCM" },
	{ title: "Gala de l'École", assoc: "BDE", location: "Salle des fêtes" },
	{ title: "Tournoi Rugby", assoc: "BDS", location: "Stade Mayol" },
	{ title: "Lan Party", assoc: "Gaming", location: "Amphi A" },
	{ title: "Hackathon 24h", assoc: "ISEN", location: "FabLab" },
	{ title: "Afterwork Alumni", assoc: "Network", location: "Le Bar central" },
]

const now = Date.now()
export const EVENTS = Array.from({ length: 25 }, (_, i) => {
	const base = EVENEMENTS_DATA[i % EVENEMENTS_DATA.length]
	const daysOffset = (i - 5) * 8
	return {
		id: i,
		title: `${base.title} #${Math.floor(i / EVENEMENTS_DATA.length) + 1}`,
		assoc: base.assoc,
		location: base.location,
		date: new Date(now + daysOffset * 86400000),
		isPast: daysOffset < 0,
	}
}).sort((a, b) => a.date.getTime() - b.date.getTime())

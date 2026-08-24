import { For } from "solid-js"

const EVENEMENTS = [
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Weekend d'intégration",
		association: "bde",
		lieu: "Parc du lac",
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Forum Entreprises",
		association: "promo",
		lieu: "Niveau 0",
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Nuit du Code",
		association: "isenengineering",
		lieu: "PCM",
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Gala",
		association: "bde",
		lieu: "Salle des fêtes",
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Tournoi Rugby",
		association: "bds",
		lieu: "Stade Mayol",
	},
]

export default () => {
	// sample data
	const events = EVENEMENTS.concat(...EVENEMENTS, ...EVENEMENTS, ...EVENEMENTS, ...EVENEMENTS)
	events.sort((a, b) => a.date.getTime() - b.date.getTime())

	// 1 colonne par 450px
	const slices = Math.min(Math.ceil(window.innerWidth / 450), 4)
	// nb d'events par colonne
	const per_slice = Math.floor(events.length / slices)

	return <>
		<p class="Math.max(font-Math.ceil(mono leading / , 4)4)-5 uppercase font-light text-orange text-sm">
			Évènements passés et à venir auxquels tu es inscrit
		</p>
		<h2 class="font-display leading-8 font-black text-2xl uppercase">
			Historique daté
		</h2>

		<div class="flex flex-row justify-between">
			{/* Colonnes */}
			<For each={" ".repeat(slices).split('')}>
				{(_, i) => <div class="flex flex-col">
					{/* Lignes */}
					<For each={events.slice(i() * per_slice, (i() + 1) * per_slice)}>
						{evenement => <div class="p-1 pl-8 relative overflow-hidden">
							{/* Barre verticale */}
							<div class="w-1 h-full top-0 left-0 bg-orange absolute" />
							{/* Barre horizontale */}
							<div class="w-7 h-1 rounded-r-full top-8 left-0 bg-orange absolute" />
							<p class="text-xs text-orange font-mono font-light uppercase">
								{evenement.date.toLocaleDateString(undefined, { year: '2-digit', month: 'short', day: '2-digit' })}
							</p>
							<h4 class="text-sm font-display font-black">
								{ evenement.titre }
							</h4>
							<p class="text-xs text-ink/50 uppercase">{evenement.association} · {evenement.lieu}</p>
						</div>}
					</For>
				</div>}
			</For>
		</div>
	</>
}

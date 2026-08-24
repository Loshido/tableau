import { useLocation } from "@solidjs/router"
import { createMemo } from "solid-js"

const EVENEMENTS = [
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Weekend d'intégration",
		association: "bde",
		lieu: "Parc du lac",
		status: "ouvert",
		categorie: "Soirées"
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Forum Entreprises",
		association: "promo",
		lieu: "Niveau 0",
		status: "inscrit",
		categorie: "Forums",
		externe: true
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Nuit du Code",
		association: "isenengineering",
		lieu: "PCM",
		status: "complet",
		categorie: "Hackathons",
		pour_toi: true,
	}
]

export default () => {
	const location = useLocation()

	const back = createMemo(() => {
		if ("back" in location.query
			&& typeof location.query["back"] === "string"
			&& location.query["back"].startsWith('/dash/')) {
			return location.query["back"]
		}
		return "/dash/discover"
	})
	const event = EVENEMENTS[Math.floor(Math.random() * 3)]
	return <main class="w-full h-full bg-papier flex flex-col gap-8 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<a href={back()} class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
			hover:font-black transition-[font-weight,background-color,color] hover:bg-ink hover:text-papier border-ink
			text-sm md:text-base">
			← Retour au tableau
		</a>

	 	<section class="relative p-4 sm:p-6 md:p-8 border-4 border-ink bg-orange flex flex-col">
			<p class="text-sm font-mono text-ink uppercase leading-2">
				{ event.categorie } · { event.association }
			</p>
			<h2 class="text-4xl sm:text-6xl md:text-8xl font-black text-ink uppercase">
				{ event.titre }
			</h2>
		</section>

		<section class="flex flex-col md:flex-row gap-4 flex-1 md:flex-none">
			<div class="flex flex-col gap-4 md:flex-7">
				<h2 class="font-display leading-8 font-black text-2xl uppercase">
					À propos de l'évènement
				</h2>
				<p>
					Le grand départ. Deux jours pour rencontrer ta promo avant même la première rentrée des cours.
				</p>
			</div>
			<div class="flex flex-col gap-2 md:flex-3 p-4 md:p-8 bg-navy mt-auto md:mt-0">
				<h2 class="font-display text-orange leading-8 font-black text-2xl uppercase">
					INFOS & Inscriptions
				</h2>

				<p class="text-papier/75 font-mono text-sm mt-4">
					Date : <span class="font-semibold text-orange uppercase">
						{event.date.toLocaleDateString(undefined, { year: undefined, month: 'short', day: "2-digit" })}
					</span>
				</p>
				<p class="text-papier/75 font-mono text-sm">
					Lieu : <span class="font-semibold text-papier"> { event.lieu } </span>
				</p>
				<p class="text-papier/75 font-mono text-sm">
					Organisateur : <span class="font-semibold text-papier uppercase"> { event.association } </span>
				</p>

				<div class="flex flex-row items-center gap-2 font-mono text-papier text-sm mt-4">
					<div class="h-3 w-3 bg-orange" />

					PLACES DISPONIBLES
				</div>

				{/*
					- Cas "ouvert" -> Places disponibles + S'inscrire
					- Cas "complet" -> Complet + Liste d'attente
					- Cas "inscrit" -> Complet/Places disponibles + Inscrit
					*/}
				<div class="w-full flex items-center justify-center text-2xl font-black uppercase
					px-4 py-3 select-none cursor-pointer mt-4
					 bg-orange text-ink  hover:bg-ink hover:text-orange transition-colors">
					S'inscrire
				</div>
			</div>
		</section>
	</main>
}

import { For } from "solid-js"
import EventCard from "~/components/event/card"

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
		status: "ouvert",
		categorie: "Forums",
		externe: true
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Nuit du Code",
		association: "isenengineering",
		lieu: "PCM",
		status: "Complet",
		categorie: "Hackathons",
		pour_toi: true,
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Gala",
		association: "bde",
		lieu: "Salle des fêtes",
		status: "Bientôt complet",
		categorie: "Soirées"
	},
	{
		date: new Date(Date.now() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 300)),
		titre: "Tournoi Rugby",
		association: "bds",
		lieu: "Stade Mayol",
		status: "Ouvert",
		categorie: "Sports"
	},
]

export default () => {
	return <main class="w-full h-full bg-papier flex flex-col gap-8 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<a onClick={() => window.history.back()} class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
			hover:font-black transition-[font-weight,background-color,color] hover:bg-ink hover:text-papier border-ink
			text-sm md:text-base">
			← Retour au tableau
		</a>

	 	<section class="relative p-4 sm:p-6 md:p-8 border-4 border-ink bg-navy flex flex-col">
			<p class="text-sm font-mono text-orange uppercase leading-2">
				Vitrine Association
			</p>
			<h2 class="text-4xl sm:text-6xl leading-24 md:text-8xl font-black text-papier uppercase">
				IsenEngineering
			</h2>
			<p class="text-xl text-papier w-2/3">
				L'association qui fait vivre le campus. Soirées, intégration, week-ends et évènements majeurs.
			</p>
			<div class="flex flex-row gap-1 items-center mt-4">
				<div class="px-2 py-1 bg-papier text-ink">2 Évènements au tableau</div>
			</div>
		</section>

		<h2 class="font-display leading-8 font-black text-2xl uppercase">
			évènements à venir
		</h2>

		<section class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
			<For each={EVENEMENTS}>
				{evenement => <EventCard
					href={`/dash/events/b?back=/dash/discover`}
					titre={evenement.titre}
					date={evenement.date}
					association={evenement.association}
					lieu={evenement.lieu}
					status={"Ouvert"}
					categorie={evenement.categorie}
					pour_toi={evenement.pour_toi}
					externe={evenement.externe}
				/>}
			</For>
		</section>
		<h2 class="font-display leading-8 font-black text-2xl uppercase">
			évènements organisés
		</h2>

		<section class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
			<For each={EVENEMENTS}>
				{evenement => <EventCard
					href={`/dash/events/b?back=/dash/discover`}
					titre={evenement.titre}
					date={evenement.date}
					association={evenement.association}
					lieu={evenement.lieu}
					status={"Ouvert"}
					categorie={evenement.categorie}
					pour_toi={evenement.pour_toi}
					externe={evenement.externe}
				/>}
			</For>
		</section>
	</main>
}

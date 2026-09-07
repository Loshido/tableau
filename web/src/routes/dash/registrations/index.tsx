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
	return <main class="w-full h-full bg-papier flex flex-col gap-1 flex-1
		p-4 px-base lg:py-8">
		<section class="mb-3">
			<p class="font-mono leading-2 uppercase font-light text-orange text-sm">
				TON ESPACE
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				Mes inscriptions
			</h2>
		</section>

		<input id="event-search" type="search" placeholder="Rechercher, ex: Nuit du code"
			class="px-4 py-2 border-4 select-none cursor-pointer snap-start text-nowrap rounded-none outline-none w-full md:w-1/3
			mb-3"/>

		<h3 class="font-display leading-8 font-black text-xl uppercase mt-4">
			évènements à venir <span class="text-orange">[5]</span>
		</h3>

		<section class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
			<For each={EVENEMENTS}>
				{evenement => <EventCard
					href={`/dash/events/a?back=/dash/registrations`}
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

		<h3 class="font-display leading-8 font-black text-xl uppercase mt-4">
			évènements passés <span class="text-orange">[4]</span>
		</h3>

		<section class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
			<For each={EVENEMENTS}>
				{evenement => <EventCard
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

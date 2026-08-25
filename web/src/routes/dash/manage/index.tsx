import { For } from "solid-js"
import EventCard from "~/components/event/card"
import Actions from "./actions"
import Label from "./label"

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
const ASSOCIATIONS = [
	"ISENENGINEERING",
	"BDE"
]

export default () => {
	return <main class="w-full h-full bg-papier flex flex-col gap-4 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">

		<div>
			<p class="font-mono leading-5 uppercase font-light text-orange text-sm">
				Gestion des évènements et associations
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				Planifier, gérer, modifier ou supprimer
			</h2>
		</div>

		<style>{` label:has(input:not(:checked)) + section {display: none} `}</style>

		<input id="event-search" type="search" placeholder="Rechercher, ex: Nuit du code"
			class="px-4 py-2 border-4 select-none snap-start text-nowrap rounded-none outline-none w-full md:w-1/3
			mb-3"/>

		<For each={ASSOCIATIONS}>
			{association => <>
				<Label association={association}
					collapsible={ ASSOCIATIONS.length !== 1 } />

				<section class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
					<For each={EVENEMENTS}>
						{evenement => <EventCard
							href={`/dash/manage/events/a`}
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
					<div class="flex flex-col gap-4">
						<Actions/>
					</div>
				</section>
			</>}
		</For>
	</main>
}

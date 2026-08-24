import { createSignal, For } from "solid-js"
import EventCard from "~/components/event/card"

const CATEGORIES = [
	"Pour toi",
	"Soirées",
	"Forums",
	"Sports",
	"Culture",
	"Hackathons"
]

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
	const [selectionCategorie, setSelectionCategorie] = createSignal<number>(0)

	return <main class="w-full h-full bg-papier flex flex-col gap-1 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<section class="mb-3">
			<p class="font-mono leading-2 uppercase font-light text-orange text-sm">
				Le programme de l'année
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				trouve ton prochain évènement
			</h2>
		</section>

		<section class="flex flex-row gap-2 font-mono md:font-light uppercase snap-mandatory snap-x overflow-x-auto
			scrollbar-thumb-orange pb-2 md:pb-0 h-fit min-w-0
			scroll-pl-4 md:scroll-pl-8 lg:scroll-pl-[5vw] xl:scroll-pl-[23vw]
			-mx-4 md:-mx-8 lg:mx-[-5vw] xl:mx-[-23vw]">
			<For each={CATEGORIES}>
				{(categorie, i) => <div class="px-4 py-2 border-4 select-none cursor-pointer snap-start
					hover:font-black transition-[font-weight,background,color] text-nowrap
					first:ml-4 md:first:ml-8 lg:first:ml-[5vw] xl:first:ml-[23vw]
					last:mr-4 md:last:mr-8 lg:last:mr-[5vw] xl:last:mr-[23vw]"
					onClick={() => setSelectionCategorie(i)}
					style={selectionCategorie() !== i() ? '' :
						'background: var(--color-ink); color: var(--color-papier); border-color: var(--color-ink); font-weight: 900'}>
					{ categorie }
				</div>}
			</For>
		</section>

		<input id="event-search" type="search" placeholder="Rechercher, ex: Nuit du code"
			class="px-4 py-2 border-4 select-none snap-start text-nowrap rounded-none outline-none w-full md:w-1/3
			mb-3"/>

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

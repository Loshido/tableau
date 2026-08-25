import Info from "./info"
import Cadre, { Resume } from "./cadre"
import { lazy, Loading } from "solid-js"
import { LoadingPlaceholder } from "~/components/loading"

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

const Editor = lazy(() => import('./editor'))

export default () => {
	const event = EVENEMENTS[Math.floor(Math.random() * 3)]
	return <main class="w-full h-full bg-papier flex flex-col gap-8 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<div class="flex flex-row flex-wrap items-center gap-8">
			<a href="/dash/manage" class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
				hover:font-black transition-[font-weight,background-color,color] hover:bg-ink hover:text-papier border-ink
				text-sm md:text-base">
				← Retour au tableau
			</a>

			<p class="font-mono leading-2 uppercase font-light text-orange text-sm">
				Cliquer pour modifier les entrées
			</p>
		</div>

		<Cadre
			in={{
				association: event.association,
				categorie: event.categorie,
				titre: event.titre
			}}/>

		<section class="flex flex-col-reverse md:flex-row gap-4 flex-1 md:flex-none">
			<div class="flex flex-col gap-2 md:flex-7 h-full">
				<Resume/>
			</div>
			<div class="flex flex-col gap-2 md:flex-3 p-4 md:p-8 bg-navy mt-auto md:mt-0">
				<Info
					in={{
						association: event.association,
						lieu: event.lieu,
						date: event.date,
						places: 50
					}} />
			</div>
		</section>
		<section>
			<h2 class="font-display leading-8 font-black text-2xl uppercase h-fit">
				À propos de l'évènement (page dédiée)
			</h2>

			<Loading fallback={<LoadingPlaceholder titre="Chargement de l'éditeur" class="min-h-64 w-full"/>}>
				<Editor/>
			</Loading>
		</section>
	</main>
}

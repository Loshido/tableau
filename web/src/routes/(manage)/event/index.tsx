import Info from "./info"
import Cadre, { Resume } from "./cadre"
import { createSignal, lazy, Loading, Show } from "solid-js"
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
	const [editionPage, setEditionPage] = createSignal(false)

	const event = EVENEMENTS[Math.floor(Math.random() * 3)]
	return <main class="w-full h-full bg-papier flex flex-col gap-8 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<div class="flex flex-row flex-wrap items-center justify-end gap-8">
			<a href="/dash/manage" class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
				hover:font-black transition-[font-weight,background-color,color] hover:bg-ink hover:text-papier border-ink
				text-sm md:text-base mr-auto">
				← Retour au tableau
			</a>

			<div class="flex flex-col justify-center text-end">
				<p class="font-mono leading-5 uppercase font-light text-orange text-sm">
					Cliquer pour modifier les entrées
				</p>
				<p class="font-mono leading-5 uppercase text-ink text-xs">
					0 Entrées modifiées
				</p>
			</div>
			<div class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
				hover:font-black transition-[font-weight,background-color,color] text-orange hover:bg-orange hover:text-papier border-orange
				text-sm md:text-base">
				Enregistrer
			</div>
		</div>

		<Cadre
			in={{
				association: event.association,
				categorie: event.categorie,
				titre: event.titre
			}}/>

		<section class="flex flex-col-reverse md:flex-row gap-8 h-full">
			<div class="flex flex-col gap-2 p-4 md:p-8 bg-navy mt-auto md:mt-0">
				<Info
					in={{
						association: event.association,
						lieu: event.lieu,
						date: event.date,
						places: 50
					}} />
			</div>
			<div class="border-4 border-ink w-full hover:bg-orange/10 transition-colors
				flex flex-col items-center justify-center relative cursor-pointer select-none aspect-5/2">
				<div class="font-display text-ink leading-8 font-black text-2xl uppercase">
					Charger une miniature
				</div>
				<p class="font-mono text-xs uppercase text-ink/50">Aspect 5 / 2 - webp</p>
			</div>
		</section>
		<section class="flex flex-col gap-2">
			<Resume/>
		</section>
		<section>

		</section>
		<Show when={editionPage()}>
			<section>
				<h2 class="font-display leading-8 font-black text-2xl uppercase h-fit">
					À propos de l'évènement (page dédiée)
				</h2>
				<Loading fallback={<LoadingPlaceholder titre="Chargement de l'éditeur" class="min-h-64 w-full"/>}>
					<Editor/>
				</Loading>
			</section>
		</Show>
		<section class="flex flex-col gap-2">
			<hr class="mb-8 border-2"/>
			<div class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center
				gap-2 cursor-pointer select-none transition-[font-weight,background-color] w-fit">
				Personnalier les couleurs de l'évènement
			</div>
			<div class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center
				gap-2 cursor-pointer select-none transition-[font-weight,background-color] w-fit"
				onClick={() => setEditionPage(true)}>
				Page dédiée pour l'évènement (images, vidéos, titres, textes...)
			</div>
			<div class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center
				gap-2 cursor-pointer select-none transition-[font-weight,background-color] w-fit"
				onClick={() => setEditionPage(true)}>
				Supprimer l'évènement
			</div>
		</section>
	</main>
}

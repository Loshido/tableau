import Info from "./info"
import Cadre, { Resume } from "./cadre"
import { createSignal, createStore, lazy, Loading, Show } from "solid-js"
import { LoadingPlaceholder } from "~/components/loading"
import { useNavigate } from "@solidjs/router"

const Editor = lazy(() => import('~/components/editor'))

const createEvent = async (event: Data.Event): Promise<{ succeed: string } | { failed: string }> => {
	if (event.category.length == 0) return { failed: "Vous devez séléctionner une catégorie"}
	if (event.date < Date.now()) return { failed: "Vous devez séléctionner une date postérieure"}
	if (event.description.length == 0) return { failed: "Vous devez écrire une description"}
	if (event.place.length == 0) return { failed: "Vous devez écrire un lieu"}
	if (event.title.length == 0) return { failed: "Votre évènement doit avoir un titre"}
	if (event.xp < 0) return { failed: "Le nombre d'xp ne peut être négatif"}

	const response = await fetch("/api/events", {
		method: "POST",
		body: JSON.stringify(event),
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	})

	if (response.status === 200) return { succeed: await response.text() }
	else return { failed: await response.text() }
}

export default () => {
	const nav = useNavigate()
	const [erreur, setErreur] = createSignal("")
	const [event, setEvent] = createStore<Data.Event>({
		title: "",
		category: "Soirées",
		date: Date.now() + 1000 * 60 * 60 * 24,
		description: "",
		place: "",
		org: "isenengineering",
		xp: 0
	})
	const [editionPage, setEditionPage] = createSignal(false)

	return <main class="w-full h-full bg-papier flex flex-col gap-8 flex-1
		p-4 px-base lg:py-8">
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
					{erreur()}
				</p>
			</div>
			<div class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
				hover:font-black transition-[font-weight,background-color,color] text-orange hover:bg-orange hover:text-papier border-orange
				text-sm md:text-base"
				onClick={async () => {
					const response = await createEvent(event)
					if('succeed' in response) return nav("/dash/manage")
					if('failed' in response) return setErreur(response.failed)
				}}>
				Créer →
			</div>
		</div>

		<Cadre
			out={{
				setCategory: (category: string) => setEvent(ev => ({
					...ev,
					category
				})),
				setTitle: (title: string) => setEvent(ev => ({
					...ev,
					title
				}))
			}}
			in={{
				organisation: event.org,
				title: event.title,
				category: event.category
			}} />

		<section class="flex flex-col-reverse md:flex-row gap-8 h-full">
			<div class="flex flex-col gap-2 p-4 md:p-8 bg-navy mt-auto md:mt-0">
				<Info in={{
						association: event.org,
						lieu: event.place,
						date: new Date(event.date),
						places: 50
					}} />
			</div>
			<div class="border-4 border-ink w-full hover:bg-orange/10 transition-colors
				flex flex-col items-center justify-center relative cursor-pointer select-none aspect-5/2">
				<div class="font-display text-ink leading-8 font-black text-2xl uppercase">
					Charger une miniature
				</div>
				<p class="font-mono text-xs uppercase text-ink/50">ratio 5 / 2 - webp</p>
			</div>
		</section>
		<section class="flex flex-col gap-2">
			<Resume out={{
					setDescription: (description: string) => setEvent(ev => ({
						...ev,
						description
					}))
				}}
				in={{
					description: ""
				}}/>
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

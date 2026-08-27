import { createSignal, lazy, Loading, Show } from "solid-js"
const Editor = lazy(() => import("~/components/editor"))
import { LoadingPlaceholder } from "~/components/loading"

export default () => {
	const [editionPage, setEditionPage] = createSignal(false)
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

	 	<section class="relative p-4 sm:p-6 md:p-8 border-4 border-ink bg-navy flex flex-col">
			<p class="text-sm font-mono text-orange uppercase leading-2">
				Vitrine Association
			</p>
			<h2 class="text-3xl sm:text-6xl my-4 md:text-8xl font-black text-papier uppercase outline-none"
				contenteditable="true">
				IsenEngineering
			</h2>
			<p class="text-xl text-papier md:w-2/3 outline-none" contenteditable="true">
				L'association qui fait vivre le campus. Soirées, intégration, week-ends et évènements majeurs.
			</p>
			<div class="flex flex-row gap-1 items-center mt-4">
				<div class="px-2 py-1 bg-papier text-ink">2 Évènements au tableau</div>
			</div>
		</section>

		<Show when={editionPage()}>
			<section>
				<Loading fallback={<LoadingPlaceholder titre="Chargement de l'éditeur" class="min-h-64 w-full"/>}>
					<Editor/>
				</Loading>
			</section>
		</Show>

		<section class="flex flex-col gap-2">
			<hr class="mb-8 border-2"/>
			<div class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center
				gap-2 cursor-pointer select-none transition-[font-weight,background-color] w-fit">
				Personnalier les couleurs de la vitrine
			</div>
			<div class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center
				gap-2 cursor-pointer select-none transition-[font-weight,background-color] w-fit"
				onClick={() => setEditionPage(true)}>
				Contenu dédié à la vitrine (images, liens, titres, textes...)
			</div>
			<div class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center
				gap-2 cursor-pointer select-none transition-[font-weight,background-color] w-fit">
				Supprimer l'association
			</div>
		</section>
	</main>
}

import { createSignal, For, Show } from "solid-js";

const OPERATEURS = [
	"prenom1.nom@isen.yncrea.fr",
	"prenom2.nom@isen.yncrea.fr",
	"prenom3.nom@isen.yncrea.fr",
]

export default () => {
	return <main class="w-full h-full bg-papier flex flex-col gap-8 flex-1 p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
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
					0 Entrée modifiée
				</p>
			</div>
			<div class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
				hover:font-black transition-[font-weight,background-color,color] text-orange hover:bg-orange hover:text-papier border-orange
				text-sm md:text-base">
				Enregistrer
			</div>
		</div>

		<section class="flex flex-col gap-4 p-4 md:p-8 bg-navy text-papier">
			<h2 class="font-display text-orange leading-8 font-black text-2xl uppercase">
				Ajouter un opérateur <span class="text-sm">pour ISENENGINEERING</span>
			</h2>
			<p class="text-papier/75 font-mono text-sm">
				Les opérateurs disposent des droits d'édition sur le tableau de l'association.
			</p>

			<form class="flex flex-col md:flex-row gap-4 mt-2">
				<input type="email" placeholder="ex: prenom.nom@isen.yncrea.fr (ou prenom.nom)"
					class="flex-1 p-3 border-4 border-ink bg-papier text-ink font-mono text-sm placeholder:text-ink/40
					outline-none"/>
				<button type="submit" class="px-6 py-3 border-4 border-ink bg-orange text-ink font-mono font-bold uppercase
					hover:bg-papier transition-colors select-none cursor-pointer">
					+ Ajouter
				</button>
			</form>
		</section>

		<section class="flex flex-col gap-4">
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				Liste des accès ({OPERATEURS.length})
			</h2>

			<div class="flex flex-col gap-3">
				<For each={OPERATEURS}>
					{(email) => <div class="border-4 border-ink bg-papier p-1 sm:p-2 md:p-4 flex flex-row items-center justify-between gap-4 hover:bg-orange/10
						transition-colors">
						<div class="flex items-center gap-1 sm:gap-3 overflow-hidden">
							<div class="w-8 h-8 bg-ink text-papier font-mono font-black text-xs flex items-center justify-center shrink-0">
								@
							</div>
							<span class="font-mono font-bold text-ink text-sm sm:text-base truncate">
								{email}
							</span>
						</div>
						<div class="flex items-center gap-1 sm:gap-3">
							<select value="Niveau 1" class="outline-none px-3 py-1 border-2 border-ink bg-papier text-ink font-mono text-xs uppercase
								hover:bg-ink hover:text-papier transition-colors shrink-0 cursor-pointer">
								<option value="Niveau 1">Niveau 1</option>
								<option value="Niveau 2">Niveau 2</option>
								<option value="Niveau 3">Niveau 3</option>
							</select>
							<button type="button" class="outline-none px-3 py-1 border-2 border-ink bg-papier text-ink font-mono text-xs uppercase
								hover:bg-ink hover:text-papier transition-colors shrink-0 cursor-pointer">
								Supprimer
							</button>
						</div>
					</div>}
				</For>
				<Show when={OPERATEURS.length === 0}>
					<div class="border-4 border-dashed border-ink/40 p-8 text-center font-mono text-ink/60 uppercase text-sm">
						Aucun opérateur configuré.
					</div>
				</Show>
			</div>
		</section>

		<section class="flex flex-col gap-2">
			<hr class="mb-8 border-2 border-ink/20" />
			<div class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center gap-2 cursor-pointer select-none
				transition-[font-weight,background-color] w-fit font-mono text-sm uppercase">
				Exporter la liste des administrateurs (.CSV)
			</div>
		</section>
	</main>
}

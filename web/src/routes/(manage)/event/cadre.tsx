import { createSignal, For } from "solid-js"

interface In {
	titre: string,
	association: string,
	categorie: string
}

const CATEGORIES = [
	"Soirées",
	"Forums",
	"Sports",
	"Culture",
	"Hackathons"
]

export default (props: { in: In }) => {
	const [categorie, setCategorie] = createSignal(props.in.categorie)
	return <section class="relative p-4 sm:p-6 md:p-8 border-4 border-ink bg-orange flex flex-col">
		<p class="text-sm font-mono text-ink uppercase leading-2">
			<label for="categorie" class="relative cursor-text">
				{categorie()}

				<select name={categorie()} id="categorie" onInput={e => setCategorie(e.target.value)}
					class="opacity-0 absolute top-0 left-0 accent-orange">
					<For each={CATEGORIES}>
						{cat => <option value={cat}>{cat}</option>}
					</For>
				</select>
			</label> · { props.in.association }
		</p>
		<h2 class="text-4xl sm:text-6xl md:text-8xl font-black text-ink uppercase h-full
			outline-none resize-none"
			contenteditable="true">
			{ props.in.titre }
		</h2>
	</section>
}

export const Resume = () => <>
	<h2 class="font-display leading-8 font-black text-2xl uppercase h-fit">
		À propos de l'évènement (court)
	</h2>
	<div class="outline-none font-display text-ink w-full h-full
		text-2xl flex-10" contenteditable="true">
		Un résumé de l'évènement pour la page d'accueil, le future, les nouveaux, les externes, vos successeurs...
	</div>
</>

import { For } from "solid-js"

interface Out {
	setTitle: (title: string) => void,
	setCategory: (category: string) => void
}

type In = { title: string, category: string, organisation: string  }

const CATEGORIES = [
	"Soirées",
	"Forums",
	"Sports",
	"Culture",
	"Hackathons"
]

export default (props: { out: Out, in: In }) => {
	return <section class="relative p-4 sm:p-6 md:p-8 border-4 border-ink bg-orange flex flex-col">
		<p class="text-sm font-mono text-ink uppercase leading-2">
			<label for="categorie" class="relative cursor-text">
				{props.in.category}

				<select name="category" id="category"
					onInput={e => props.out.setCategory(e.target.value)}
					class="opacity-0 absolute top-0 left-0 accent-orange">
					<For each={CATEGORIES}>
						{cat => <option value={cat}>{cat}</option>}
					</For>
				</select>
			</label> · { props.in.organisation }
		</p>
		<div class="text-4xl sm:text-6xl md:text-8xl font-black text-ink uppercase h-full
			outline-none resize-none w-full placeholder:text-ink/50 placeholder:uppercase"
			onInput={e => {
				const target = e.target as HTMLDivElement
				if (target.innerText.length === 0) props.out.setTitle("Titre de l'évènement")
				else props.out.setTitle(target.innerText)
			}}
			innerText="Titre de l'évènement" contenteditable="true">
			{/*placeholder="Titre de l'évènement">*/}
		</div>
	</section>
}

type ResumeOut = { setDescription: (description: string) => void }
type ResumeIn = { description: string }

export const Resume = (props: { in: ResumeIn, out: ResumeOut	 }) => <>
	<h2 class="font-display leading-8 font-black text-2xl uppercase h-fit">
		À propos de l'évènement (court)
	</h2>
	<textarea class="outline-none font-display text-ink w-full h-full
		text-2xl flex-10" value={props.in.description}
		placeholder="Un résumé de l'évènement pour la page d'accueil, le future, les nouveaux, les externes, vos successeurs..."
		onInput={e => props.out.setDescription(e.target.value)}>
	</textarea>
</>

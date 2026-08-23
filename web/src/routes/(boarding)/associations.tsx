import { createSignal, For } from "solid-js";
import Header from "~/components/header";

const ASSOCIATIONS: {
	nom: string,
	id: string,
	couleur: `#${string}`
}[] = [
	{
		nom: "IsenEngineering",
		id: "isenengineering",
		couleur: "#20396E"
	},
	{
		nom: "BDE - Formul1sen",
		id: "bde",
		couleur: "#060000"
	},
	{
		nom: "BDA - Tahit'Isen",
		id: "bda",
		couleur: "#E57B28"
	},
	{
		nom: "BDS - Drakisen",
		id: "bds",
		couleur: "#551E54"
	},
	{
		nom: "ISEN PROMO",
		id: "promo",
		couleur: "#E30613"
	},
]

export default () => {
	const [interets, setInterets] = createSignal<Set<string>>(new Set())

	const toggleInteret = (interet: string) => {
		const set = interets()
		set.has(interet) ? set.delete(interet) : set.add(interet)
		setInterets(new Set<string>(set.values()))
	}

    return <div class="bg-papier min-h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
        <Header logo_href="/auth" className="border-b-2 border-ink bg-papier absolute top-0 left-0 z-10"
            links={[
                {
                    titre: "Ignorer",
                    href: "/dash",
                    className: "bg-ink text-papier"
                }
            ]} />

        <div class="px-4 md:p-0 md:w-2/3 lg:w-1/3 z-10 flex flex-col gap-2">
			<p class="text-2xl font-semibold font-display w-4/5 mb-8">
				Choisissez les associations pour lesquelles vous portez un intérêt
			</p>

			<For each={ASSOCIATIONS}>
				{
					association => <div class={`px-4 py-2 text-2xl font-semibold transition-colors select-none
					 	border-l-4 border-[${association.couleur}] hover:bg-[${association.couleur}10] cursor-pointer`}
						style={interets().has(association.id) ? `background: ${association.couleur}20;` : ""}
						onClick={() => toggleInteret(association.id)}>
						{association.nom}
					</div>
				}
			</For>

			<a href="" class="px-4 py-2 bg-ink text-papier w-fit mt-8
				font-mono text-sm uppercase font-normal hover:font-black transition-[font-weight]">
				Accéder au tableau
            </a>
		</div>
    </div>
}

interface In {
	date: Date,
	lieu: string,
	association: string,
	places: number
}

export default (props: { in: In, out?: null }) => {
	return <>
		<h2 class="font-display text-orange leading-8 font-black text-2xl uppercase">
			INFOS & Inscriptions
		</h2>

		<p class="text-papier/75 font-mono text-sm mt-4">
			Date : <input class="font-semibold text-orange uppercase relative
				accent-orange decoration-orange outline-none" type="date"
				value={props.in.date.toISOString().slice(0, 10)}/>
		</p>
		<p class="text-papier/75 font-mono text-sm">
			Lieu : <input value={props.in.lieu} type="text"
				class="font-semibold text-papier outline-none"
				placeholder="Lieu où se tiendra l'évènement"/>
		</p>
		<p class="text-papier/75 font-mono text-sm">
			Organisateur : <span class="font-semibold text-papier uppercase"> { props.in.association } </span>
		</p>
		<p class="text-papier/75 font-mono text-sm">
			Nombre de place : <input class="font-semibold text-papier outline-none w-24"
			value={props.in.places} placeholder="ex: 50" />
		</p>
		<p class="text-papier/25 font-mono text-xs">
			Laissez le nombre de place vide pour ne pas imposer de limiter
		</p>
	</>
}

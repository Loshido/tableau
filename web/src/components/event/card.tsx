interface EventProps {
	date?: Date,
	titre: string,
	association?: string,
	lieu?: string,
	status: "Ouvert" | "Planification" | "Complet" | "Bientôt complet",
	categorie: string,
	xp?: number,
	pour_toi?: boolean,
	externe?: boolean,
	href?: string
}

const STAR = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
	stroke-linejoin="round" class="w-5 h-5 fill-ink p-1">
	<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
</svg>

export default (event: EventProps) => <a href={event.href}
	class="flex flex-col border-2 border-navy cursor-pointer transition-[translate,box-shadow]
		hover:-translate-1 hover:shadow-[6px_6px_0_var(--color-ink)]">
	<div class="flex-1 relative bg-navy flex items-center justify-center overflow-hidden
		aspect-5/2">
		{/* Association en tant que placeholder */}
		<p class="w-fit uppercase text-2xl text-papier/25 select-none">{event.association}</p>

		{/* Date */}
		{event.date && <div class="absolute top-2 left-2 px-1 py-0.5
		 	bg-ink text-papier uppercase text-xs font-mono select-none">
				{ event.date.toLocaleDateString(undefined, { year: undefined, month: "short", day: "2-digit" })}
			</div>
		}

		{/* Catégorie */}
		<div class="absolute top-2 right-2 px-1 py-0.5 bg-papier text-ink uppercase text-xs font-mono">
			{ event.categorie }
		</div>

		<div class="absolute bottom-2 right-2 flex flex-row items-center gap-1 uppercase text-xs font-mono">
			{/* Étoile pour accentuer ses associations */}
			{event.pour_toi && <div class="bg-orange fill-ink" title="Pour toi">
				{STAR}
			</div>}

			{/* Mention externe */}
			{event.externe && <div class="bg-sky-400 font-black text-ink px-1 py-0.5 select-none"
				title="Évènement hors du Tableau">
				externe^
			</div>}
		</div>
	</div>
	<div class="p-4">
		<h2 class="font-bold font-display text-xl leading-8">{event.titre}</h2>
		{
			(event.association !== undefined || event.lieu !== undefined) && <>
				<p class="uppercase font-mono text-xs text-ink/75">
					{/* Liens vers la vitrine de l'association */}
					<a href={`/dash/associations/` + event.association}
						class="underline underline-offset-3 decoration-orange decoration-dashed
						hover:text-orange transition-colors">
						{event.association}
					</a>
					{event.lieu && event.association && ' - ' + event.lieu}
				</p>
				<div class="my-2 w-[99%] mx-auto h-0.5 bg-ink/5 rounded-full" />
			</>
		}

		<div class="flex flex-row items-center justify-between text-xs font-mono">
			<div class="flex flex-row gap-1 items-center">
				<div class="bg-orange w-2 h-2" />
				{/* Ouvert/Complet/Passe */}
				{ event.status }
			</div>
			<p class="text-orange">
				{/* Nombre d'xp gagné ou "inscrit" */}
				+{ event.xp || 50 }xp
			</p>
		</div>
	</div>
</a>

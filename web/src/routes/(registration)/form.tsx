import { lazy } from "solid-js"

const Ticket = lazy(() => import("~/components/event/ticket"))

export default () => {
	return <div class="bg-papier flex-1 h-full w-full flex flex-col gap-4 relative overflow-hidden
    	p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<section>
		   	<p class="font-mono uppercase font-light text-orange text-sm">
				Formulaire d'inscripion
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				NUIT DU CODE
			</h2>
		</section>

		<section class="flex flex-col-reverse gap-4 md:flex-row">
			<Ticket
				ticket_id="AE"
				event_name="NUIT DU CODE"
				date={new Date()}
				association="ISENENGINEERING"
				id="PRENOM NOMMMMMMMMM"/>
			<div class="flex flex-col gap-2">
				<div class="grid grid-cols-3">
					<input class="uppercase text-ink/50 px-2 py-1 text-sm md:text-base border-4 border-ink outline-none"
						placeholder="Titre du champs" disabled={true} />
					<input class="font-black uppercase px-2 py-1 text-sm md:text-base border-4 border-ink col-span-2 outline-none border-l-0 w-full"
						placeholder="Valeur du champs" />
				</div>
				<div class="grid grid-cols-3">
					<input class="uppercase text-ink/50 px-2 py-1 text-sm md:text-base border-4 border-ink outline-none"
						placeholder="Titre du champs" disabled={true} />
					<input class="font-black uppercase px-2 py-1 text-sm md:text-base border-4 border-ink col-span-2 outline-none border-l-0 w-full"
						placeholder="Valeur du champs" />
				</div>
				<div class="grid grid-cols-3">
					<input class="uppercase text-ink/50 px-2 py-1 text-sm md:text-base border-4 border-ink outline-none"
						placeholder="Titre du champs" disabled={true} />
					<input class="font-black uppercase px-2 py-1 text-sm md:text-base border-4 border-ink col-span-2 outline-none border-l-0 w-full"
						placeholder="Valeur du champs" />
				</div>
				<div class="grid grid-cols-3">
					<input class="uppercase text-ink/50 px-2 py-1 text-sm md:text-base border-4 border-ink outline-none"
						placeholder="Titre du champs" disabled={true} />
					<select class="font-black uppercase px-2 py-1 text-sm md:text-base border-4 border-ink col-span-2 outline-none border-l-0 w-full">
						<option value="Option 1">Option 1</option>
						<option value="Option 2">Option 2</option>
						<option value="Option 3">Option 3</option>
						<option value="Option 4">Option 4</option>
					</select>
				</div>
			</div>
		</section>

		<a href="/dash/register/a/confirm" class="px-4 py-2 bg-orange text-papier w-fit
			font-mono text-sm uppercase font-normal hover:font-black transition-[font-weight]">
			Finaliser l'inscription
	       </a>
	</div>
}

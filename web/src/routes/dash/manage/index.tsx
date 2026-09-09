import { createMemo, For } from "solid-js"
import EventCard from "~/components/event/card"
import Actions from "./actions"
import Label from "./label"
import { useNavigate } from "@solidjs/router"

export default () => {
	const nav = useNavigate()
	const events = createMemo(async () => {
		const orgs_response = await fetch("/api/operators/list-org", {
			credentials: "include"
		})
		if (orgs_response.status !== 200) throw nav("/dash/discover")

		const orgs = (await orgs_response.json()) as [string, Data.Organisation, number][]

		const response = await fetch(`/api/events`)
		if (response.status !== 200) throw nav("/dash/discover")
		const events = (await response.json()) as [string, Data.Event][]

		return orgs
			.filter(([_org_id, _org, level]) => level > 1)
			.map(([org_id, org, _level]) => ({
			org_id,
			org_name: org.name,
			org_desc: org.description,
			events: events.filter(([_ev_id, ev]) => ev.org === org_id)
		}))
	})

	return <main class="w-full h-full bg-papier flex flex-col gap-4 flex-1
		p-4 px-base lg:py-8">

		<div>
			<p class="font-mono leading-5 uppercase font-light text-orange text-sm">
				Gestion des évènements et associations
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				Planifier, gérer, modifier ou supprimer
			</h2>
		</div>

		<style>{` label:has(input:not(:checked)) + section {display: none} `}</style>

		<input id="event-search" type="search" placeholder="Rechercher, ex: Nuit du code"
			class="px-4 py-2 border-4 select-none snap-start text-nowrap rounded-none
			outline-none w-full md:w-1/3 mb-3"/>

		<For each={events()}>
			{org => <>
				<Label association={org.org_name}
					collapsible={ events().length !== 1 } />

				<section class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
					<For each={org.events}>
						{([event_id, evenement]) => <EventCard
							href={`/dash/manage/events/${event_id}`}
							titre={evenement.title}
							date={new Date(evenement.date)}
							association={evenement.org}
							lieu={evenement.place}
							status={"Ouvert"}
							categorie={evenement.category}
							pour_toi={!!Math.round(Math.random())}
							externe={!!Math.round(Math.random() * 0.5)}
						/>}
					</For>
					<div class="flex flex-col gap-4">
						<Actions/>
					</div>
				</section>
			</>}
		</For>
	</main>
}

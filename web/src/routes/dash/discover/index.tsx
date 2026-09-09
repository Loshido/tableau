import { createMemo, createSignal, For } from "solid-js"
import EventCard from "~/components/event/card"

const CATEGORIES = [
	"Pour toi",
	"Soirées",
	"Forums",
	"Sports",
	"Culture",
	"Hackathons"
]

export default () => {
	const [category, setCategory] = createSignal<string | null>(null)
	const [search, setSearch] = createSignal("")
	const onSearch = () => {
		let t = 0
		return (e: InputEvent) => {
			t = Date.now()
			setTimeout(() => {
				if (Date.now() - t <= 150) return
				const target = e.target as HTMLInputElement

				setSearch(target.value.toLowerCase())
			}, 150)
		}
	}

	const pour_toi = createMemo<string[]>(async () => {
		const response = await fetch("/api/favorites", {
			credentials: "include"
		})

		if (response.status !== 200) return []
		return (await response.text()).split(",")
	})

	const events = createMemo<[string, Data.Event][]>(async () => {
		const response = await fetch("/api/events", {
			credentials: "include"
		})

		if (response.status !== 200) return []
		return await response.json()
	})
	const filteredEvents = createMemo(() => events()
		.filter(([_ev_id, ev]) => {
			let categorySelected = false
			if (category() === null) categorySelected = true
			else if (ev.category === category()) categorySelected = true
			else if (category() === "Pour toi" && pour_toi().includes(ev.org)) categorySelected = true

			let searchSelected = false
			if (search().length === 0) searchSelected = true
			else if (ev.title.toLowerCase().includes(search())) searchSelected = true
				else if (ev.description.toLowerCase().includes(search())) searchSelected = true
					else if (ev.place.toLowerCase().includes(search())) searchSelected = true

			return searchSelected && categorySelected
		}))

	return <main class="w-full h-full bg-papier flex flex-col gap-1 flex-1
		p-4 px-base lg:py-8">
		<section class="mb-3">
			<p class="font-mono leading-2 uppercase font-light text-orange text-sm">
				Le programme de l'année
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				trouve ton prochain évènement
			</h2>
		</section>

		<section class="flex flex-row gap-2 font-mono md:font-light uppercase snap-mandatory snap-x overflow-x-auto
			scrollbar-thumb-orange pb-2 md:pb-0 h-fit min-w-0
			scroll-pl-4 md:scroll-pl-8 lg:scroll-pl-[5vw] xl:scroll-pl-[23vw]
			-mx-4 md:-mx-8 lg:mx-[-5vw] xl:mx-[-23vw]">
			<For each={CATEGORIES}>
				{(cat) => <div class="px-4 py-2 border-4 select-none cursor-pointer snap-start
					hover:font-black transition-[font-weight,background,color] text-nowrap
					first:ml-4 md:first:ml-8 lg:first:ml-[5vw] xl:first:ml-[23vw]
					last:mr-4 md:last:mr-8 lg:last:mr-[5vw] xl:last:mr-[23vw]"
					onClick={() => category() === cat ? setCategory(null) : setCategory(cat)}
					style={category() !== cat ? '' :
						'background: var(--color-ink); color: var(--color-papier); border-color: var(--color-ink); font-weight: 900'}>
					{ cat }
				</div>}
			</For>
		</section>

		<input id="event-search" type="search" placeholder="Rechercher, ex: Nuit du code"
			class="px-4 py-2 border-4 select-none snap-start text-nowrap rounded-none outline-none w-full md:w-1/3
			mb-3"
			onInput={onSearch()} />

		<section class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
			<For each={filteredEvents()}>
				{([id, evenement]) => <EventCard
					href={`/dash/events/${id}`}
					titre={evenement.title}
					date={new Date(evenement.date)}
					association={evenement.org}
					lieu={evenement.place}
					status={"Ouvert"}
					categorie={evenement.category}
					pour_toi={pour_toi().includes(evenement.org)}
					externe={!!Math.round(Math.random() * 0.5)}
				/>}
			</For>
		</section>
	</main>
}

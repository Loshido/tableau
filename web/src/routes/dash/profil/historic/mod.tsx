import { createSignal, createMemo, For, onSettled } from "solid-js"
import { EVENTS } from "./placeholder"
import { useNavigate } from "@solidjs/router"

const STEP_X = 140
const PADDING_X = 100
const SVG_HEIGHT = 260
const CENTER_Y = 130
const AMPLITUDE = 45

export default function InteractiveTimeline() {
	const [isDragging, setIsDragging] = createSignal(false)
	const navigate = useNavigate()

	let scrollRef: HTMLDivElement | undefined
	let startX = 0
	let scrollLeft = 0

	const totalWidth = createMemo(() => PADDING_X * 2 + (EVENTS.length - 1) * STEP_X)

	// calcule de la position x intiale affichée
	const t_now = Date.now()
	const x_now = EVENTS.reduce<[number, number]>(([t1, x], event, i) => {
		const t2 = event.date.getTime()
		return Math.abs(t1 - t_now) < Math.abs(t2 - t_now) ? [t1, x] : [t2, PADDING_X + i * STEP_X]
	}, [Infinity, -1])

	// chaque noeud (position calculée)
	const nodes = createMemo(() => EVENTS.map((event, i) => {
		const x = PADDING_X + i * STEP_X
		const y = CENTER_Y + Math.sin(i * 0.9) * AMPLITUDE
		return { ...event, x, y }
	}))

	// chemin pour les lignes
	const pathD = createMemo(() => nodes().reduce((acc, pt, i, pts) => {
		if (i === 0) return `M ${pt.x} ${pt.y}`
		const prev = pts[i - 1]
		const cx = (prev.x + pt.x) / 2
		return acc + ` C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`
	}, ""))

	const handleWheel = (e: WheelEvent) => {
		if (scrollRef && e.deltaY !== 0) {
			e.preventDefault()
			scrollRef.scrollLeft += e.deltaY
		}
	}

	const handleMouseDown = (e: MouseEvent) => {
		if (!scrollRef) return
		setIsDragging(true)
		startX = e.pageX - scrollRef.offsetLeft
		scrollLeft = scrollRef.scrollLeft
	}
	const handleMouseLeaveOrUp = () => setIsDragging(false)
	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging() || !scrollRef) return
		e.preventDefault()
		const x = e.pageX - scrollRef.offsetLeft
		const walk = (x - startX) * 1.5 // Vitesse du drag
		scrollRef.scrollLeft = scrollLeft - walk
	}

	onSettled(() => {
		if(!scrollRef) return
		// positionement à l'évènement le plus proche
		const width = scrollRef.clientWidth || 0
		scrollRef.scrollTo(x_now[1] - width / 2, 0)

		scrollRef.addEventListener("wheel", handleWheel, { passive: false })
		return () => scrollRef.removeEventListener("wheel", handleWheel)
	})

	return <div class="w-full p-4 border-2 border-ink shadow-sm
		transition-colors select-none bg-papier text-ink">
		<div class="mb-4 flex items-center justify-between border-b pb-3 border-ink/10 text-xs">
			<div class="flex items-center gap-2.5">
				<h2 class="font-mono font-bold tracking-widest uppercase text-orange">
					Historique Daté ({EVENTS.length} événements)
				</h2>
			</div>
			<p class="font-mono text-ink/50 hidden md:block">
				Molette ou Clic + Glisser pour naviguer
			</p>
		</div>

		{/* Zone interactive de scroll */}
		<div ref={scrollRef}
			class={[
				"w-[calc(100%+32px)] h-full overflow-x-auto overflow-y-hidden pb-4 -mx-4 transition-all scrollbar-none",
				isDragging() ? "cursor-grabbing" : "cursor-grab"
			]}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseLeaveOrUp}
			onMouseLeave={handleMouseLeaveOrUp}
			onMouseMove={handleMouseMove}>
			{nodes().length === 0 && <div class="flex flex-row gap-4 md:gap-8 items-center justify-center min-h-32 w-full">
				<p class="font-display text-lg w-fit md:text-xl font-black">Vous ne vous pas encore inscrit à un évènement</p>
			</div> }
			<svg
				width={totalWidth()}
				height={SVG_HEIGHT}
				class={["overflow-visible pointer-events-none", nodes().length === 0 && "hidden"]}>
				<defs>
					<linearGradient id="paper-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="var(--color-navy)" stop-opacity="0.3" />
						<stop offset="30%" stop-color="var(--color-orange)" />
						<stop offset="70%" stop-color="var(--color-orange)" />
						<stop offset="100%" stop-color="var(--color-navy)" stop-opacity="0.3" />
					</linearGradient>

					<filter id="paper-glow" x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
				</defs>
				<line
					x1={PADDING_X - 50}
					y1={CENTER_Y}
					x2={totalWidth() - PADDING_X + 50}
					y2={CENTER_Y}
					stroke="var(--color-ink)"
					stroke-width="1"
					stroke-dasharray="3 3"
					opacity="0.15"
				/>

				<path
					d={pathD()}
					fill="none"
					stroke="url(#paper-line-grad)"
					stroke-width="6"
					filter="url(#paper-glow)"
					opacity="0.25"
				/>
				{/*<path
					d={pathD()}
					fill="none"
					stroke="url(#paper-line-grad)"
					stroke-width="2.5"
				/>*/}

				<For each={nodes()}>
					{(node) => {
						const isTop = node.y < CENTER_Y
						const dateStr = node.date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: '2-digit' })

						return <g
							onClick={() => navigate('/dash/events/' + node.id)}
							transform={`translate(${node.x}, ${node.y})`}
							class="pointer-events-auto cursor-pointer group">
							<line
								x1="0"
								y1="0"
								x2="0"
								y2={CENTER_Y - node.y }
								stroke={node.isPast ? "var(--color-navy)" : "var(--color-orange)"}
								stroke-width="1.5"
								stroke-dasharray="2 2"
								opacity={node.isPast ? "0.3" : "0.7"}/>

							<circle
								fill="var(--color-orange)"
								class="transition-all duration-300 ease-out
									opacity-0 group-hover:opacity-20
									[r:10] group-hover:[r:22]"
							/>

							<circle
								fill={node.isPast ? "var(--color-papier)" : "var(--color-orange)"}
								stroke={node.isPast ? "var(--color-navy)" : "var(--color-papier)"}
								class="transition-all duration-200 [r:4.5] group-hover:[r:6.5] stroke-2"
							/>

							<g transform={`translate(0, ${isTop ? -32 : 32})`}>
								<text
									y="-14"
									text-anchor="middle"
									class="text-[10px] font-mono tracking-tight transition-colors font-semibold
										group-hover:fill-orange fill-ink">
									{dateStr}
								</text>

								<text
									y="0"
									text-anchor="middle"
									class="text-xs transition-colors group-hover:fill-orange fill-ink font-extrabold">
									{node.title}
								</text>

								<text
									y="14"
									text-anchor="middle"
									class="text-[9px] font-mono uppercase tracking-wider fill-ink opacity-50 font-medium">
									{node.assoc} · {node.location}
								</text>
							</g>
						</g>
					}}
				</For>
			</svg>
		</div>
	</div>
}

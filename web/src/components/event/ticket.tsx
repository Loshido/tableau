import { onSettled } from "solid-js"
import Logo from "~/components/logo/icon"
import ticketTilt from "./ticket-tilt"

// grain mask
const GrainMask = <svg viewBox="0 0 700 700"
	class="absolute top-0 left-0 w-auto h-screen pointer-events-none z-0!">
	<defs>
		<filter id="nnnoise-filter-orange" x="-20%" y="-20%" width="100%" height="100%" filterUnits="objectBoundingBox"
			primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
			<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="15" stitchTiles="stitch"
				x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
			<feSpecularLighting surfaceScale="25" specularConstant="3" specularExponent="20" lighting-color="var(--color-orange)"
				x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
    			<feDistantLight azimuth="3" elevation="81"></feDistantLight>
  			</feSpecularLighting>
		</filter>
		<filter id="nnnoise-filter" x="-20%" y="-20%" width="100%" height="100%" filterUnits="objectBoundingBox"
			primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
			<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="15" stitchTiles="stitch"
				x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
			<feSpecularLighting surfaceScale="15" specularConstant="3" specularExponent="20" lighting-color="#FFF"
				x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
    			<feDistantLight azimuth="3" elevation="81"></feDistantLight>
  			</feSpecularLighting>
		</filter>
	</defs>
	<rect width="100%" height="100%" fill="transparent" filter="url(#nnnoise-filter)" opacity="0.05"
		style="mix-blend-mode: soft-light; z-index: 10;" />
</svg>

const WAVE = {
	class: " bg-repeat-x absolute inset-x-0 h-3 -top-1.5 bg-radial-(--radial) bg-size-[20px_20px]".replaceAll(" ", " before:"),
	style: "--radial: circle at 10px 0,var(--color-papier) 10px, transparent 10.5px;"
}

interface TicketProps {
	ticket_id: string,
	event_name: string
	date: Date,
	association: string,
	id: string
}

export const TiltedTicket = (props: TicketProps) => {
	let container: HTMLDivElement | undefined
	let ticket: HTMLElement | null

	onSettled(() => {
		ticket = document.getElementById(`ticket-${props.ticket_id}`)
		if (!ticket || !container || window.innerWidth < 768) return

		const { onMouseEnter, onMouseLeave, onMouseMove } = ticketTilt(ticket)

		container.addEventListener('mouseenter', onMouseEnter)
		container.addEventListener('mouseleave', onMouseLeave)
		container.addEventListener('mousemove', onMouseMove)
		return () => {
			container.removeEventListener('mouseenter', onMouseEnter)
			container.removeEventListener('mouseleave', onMouseLeave)
			container.removeEventListener('mousemove', onMouseMove)
		}
	})

	return <div class="w-full flex justify-center items-center py-16" ref={container}>
		<Ticket {...props} />
	</div>
}

export const Ticket = (props: TicketProps) => <div id={`ticket-${props.ticket_id}`}
	class={["w-72 h-[40dvh] bg-zinc-700 relative text-papier",
	"font-display p-2 flex flex-col overflow-hidden *:z-20 pt-4", WAVE.class]} style={WAVE.style}>
	<p class="uppercase text-papier/50">
		ticket <span class="font-black text-papier">{ props.ticket_id.padStart(4, '_') }</span>
	</p>
	<p class="uppercase text-papier/50">
		event <span class="text-papier font-black">{ props.event_name }</span>
	</p>
	<p class="uppercase text-papier/50">
		date <span class="text-papier font-black">{props.date.toLocaleString("fr-FR", {
			dateStyle: "short",
			timeStyle: "short"
		}) }</span>
	</p>
	<p class="uppercase text-papier/50">
		org <span class="text-papier font-black">{ props.association }</span>
	</p>
	<p class="uppercase text-papier/50">
		id <span class="text-papier font-black">{ props.id }</span>
	</p>

	<div class="w-32 h-32 bg-black mt-auto z-50! flex items-center justify-center">
		<p class="text-xs font-display font-black">QRCode</p>
	</div>
	<div class="absolute bottom-2 right-2 z-50!" title="by Tableau">
		<Logo color="var(--color-papier)"/>
	</div>

	{GrainMask}
</div>

export default Ticket;

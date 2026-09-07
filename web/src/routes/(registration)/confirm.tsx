import { lazy } from "solid-js"
import { TiltedTicket } from "~/components/event/ticket"


const Ticket = lazy(() => import("~/components/event/ticket"))
const AddToAppleWallet = lazy(() => import("~/components/event/add-to-apple-wallet"))
const AddToWallet = lazy(() => import("~/components/event/add-to-wallet"))

export default () => {
	return <div class="bg-papier flex-1 h-full w-full flex flex-col gap-4 relative overflow-hidden
    	p-4 px-base lg:py-8">
		<section>
		   	<p class="font-mono uppercase font-light text-orange text-sm">
				Confirmation
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				Votre inscription est confirmée
			</h2>
		</section>

		<TiltedTicket
			ticket_id="AE"
			event_name="NUIT DU CODE"
			date={new Date()}
			association="ISENENGINEERING"
			id="PRENOM NOMMMMMMMMM"/>

		<div class="flex flex-row flex-wrap items-center gap-4">
			<a href="/dash/registrations" class="px-4 py-2 bg-ink text-papier w-fit
				font-mono text-sm uppercase font-normal hover:font-black transition-[font-weight]">
				Inscriptions
			</a>

			<div class="cursor-pointer">
				<AddToAppleWallet/>
			</div>
			<div class="cursor-pointer">
				<AddToWallet/>
			</div>
		</div>
	</div>
}

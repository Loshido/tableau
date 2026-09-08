import { useNavigate } from "@solidjs/router"
import { createContext, createMemo, ParentProps, SourceAccessor, useContext } from "solid-js"

const SESSION_TTL = 1000 * 60 * 2.5 // ms
export const SessionCtx = createContext<SourceAccessor<Data.User>>()
export const SessionProvider = (props: ParentProps) => {
	const nav = useNavigate()
	const session = createMemo(async () => {
		const cache = sessionStorage.getItem("whoami")
		if (cache !== null) {
			const [t, data] = JSON.parse(cache) as [number, Data.User]
			if (t + SESSION_TTL >= Date.now()) {
				return data
			}
		}

		const response = await fetch("/auth/whoami", {
			credentials: "include"
		})

		if (response.status === 200) {
			const data: Data.User = await response.json()
			sessionStorage.setItem("whoami", JSON.stringify([Date.now(), data]))

			return data
		} else {
			console.error("GET /auth/whoami", response.status, response.statusText)
			throw nav('/auth')
		}
	})
	return <SessionCtx value={session}>
		{props.children}
	</SessionCtx>
}


export default () => {
	const session = useContext(SessionCtx)
	return <>
		<a href="/dash/discover" class="px-4 py-2 bg-ink/15 hover:bg-ink text-papier flex flex-row items-center gap-2
	   	font-normal hover:font-black transition-[font-weight,background-color]
		data-active:bg-ink">
			Découvrir
		</a>
		<a href="/dash/registrations" class="px-4 py-2 bg-ink/15 hover:bg-ink text-papier flex flex-row items-center gap-2
	   	transition-[font-weight,background-color] data-active:bg-ink">
			Mes Inscriptions
		</a>
		<a href="/dash/manage" class="px-4 py-2 bg-ink/15 hover:bg-ink text-papier flex flex-row items-center gap-2
	   	font-normal hover:font-black transition-[font-weight,background-color] data-active:bg-ink">
			Gestion
		</a>
		<a href="/dash/profil" class="px-4 py-2 bg-ink text-papier flex flex-row items-center gap-2
	   font-normal hover:font-black transition-[font-weight] data-active:font-black">
			<div class="w-6 h-6  bg-papier rounded-full">
				<img src={session().picture} alt="profile picture" class="h-6 w-6 rounded-full" />
			</div>
			{ session().name }

			{/*<div class="border-4 border-l-0 bg-papier text-ink
			-mr-4 -my-2 px-4 py-2 flex flex-row items-center">
				100 <span class="text-[10px] text-ink/75">XP</span>
			</div>*/}
		</a>
	</>
}

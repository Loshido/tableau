import { useLocation } from "@solidjs/router"

export default () => {
	const location = useLocation()

	return <>
		<a href="/dash/discover" class="px-4 py-2 bg-ink/15 hover:bg-ink text-papier flex flex-row items-center gap-2
		   	font-normal hover:font-black transition-[font-weight,background-color]"
			style={location.pathname.startsWith("/dash/discover") ? "background: var(--color-ink)" : ""}>
			Découvrir
		</a>
		<a href="/dash/registrations" class="px-4 py-2 bg-ink/15 hover:bg-ink text-papier flex flex-row items-center gap-2
		   	transition-[font-weight,background-color]"
			style={location.pathname.startsWith("/dash/registrations") ? "background: var(--color-ink)" : ""}>
			Mes Inscriptions
		</a>
		<a href="/dash/organization" class="px-4 py-2 bg-ink/15 hover:bg-ink text-papier flex flex-row items-center gap-2
		   	font-normal hover:font-black transition-[font-weight,background-color]"
			style={location.pathname.startsWith("/dash/organization") ? "background: var(--color-ink)" : ""}>
			Espace Organisation
		</a>
		<a href="/dash/profil" class="px-4 py-2 bg-ink text-papier flex flex-row items-center gap-2
		   font-normal hover:font-black transition-[font-weight]"
			style={location.pathname.startsWith("/dash/profil") ? "font-weight: 900" : ""}>
			<div class="w-6 h-6  bg-papier rounded-full" />
			Prenom A.

			<div class="border-4 border-l-0 bg-papier text-ink
				-mr-4 -my-2 px-4 py-2 flex flex-row items-center">
				100 <span class="text-[10px] text-ink/75">XP</span>
			</div>
		</a>
	</>
}

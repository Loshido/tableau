export default () => <>
	<p class="font-mono leading-5 uppercase font-light text-orange text-sm mb-2">
		Actions
	</p>

	<a class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center gap-2
		cursor-pointer select-none transition-[font-weight,background-color]">
		Installer sur votre appareil <sup class="uppercase font-black">todo</sup>
	</a>
	<a href="/dash/support/report"
		class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center gap-2
		cursor-pointer select-none transition-[font-weight,background-color]">
		Signaler un problème
	</a>
	<a href="/dash/support/my-data" class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row
		items-center gap-2 cursor-pointer select-none transition-[font-weight,background-color]">
		Mes données <sup class="uppercase font-black">todo</sup>
	</a>
	<a class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center gap-2
		cursor-pointer select-none transition-[font-weight,background-color]">
		Déconnexion <sup class="uppercase font-black">todo</sup>
	</a>
</>

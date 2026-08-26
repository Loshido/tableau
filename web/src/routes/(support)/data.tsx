export default () => <main class="w-full h-full bg-papier flex flex-col gap-1 flex-1
	p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw] relative">
	<a onClick={() => window.history.back()} class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
		hover:font-black transition-[font-weight,background-color,color] hover:bg-ink hover:text-papier border-ink
		text-sm md:text-base">
		← Retour au tableau
	</a>
	<h2 class="font-display leading-8 font-black text-2xl uppercase mt-8">
		Vos données
	</h2>
	<a class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center gap-2
		cursor-pointer select-none transition-[font-weight,background-color]"
		title="Il s'agit des mêmes données qui seront supprimées à l'appuie du bouton ci-dessous">
		Voir les données associées à votre compte
	</a>
	<a class="px-4 py-2 bg-ink/50 hover:bg-ink text-papier flex flex-row items-center gap-2
		cursor-pointer select-none transition-[font-weight,background-color]">
		Demander la suppresion du compte et les données associées
	</a>
</main>

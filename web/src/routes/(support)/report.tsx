export default () => <main class="w-full h-full bg-papier flex flex-col gap-1 flex-1
	p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw] relative">
	<a onClick={() => window.history.back()} class="px-4 py-2 border-4 select-none cursor-pointer font-mono md:font-light uppercase w-fit
		hover:font-black transition-[font-weight,background-color,color] hover:bg-ink hover:text-papier border-ink
		text-sm md:text-base">
		← Retour au tableau
	</a>
	<h2 class="font-display leading-8 font-black text-2xl uppercase mt-8">
		Signaler un problème
	</h2>
	<div class="h-96 w-full relative">
		<textarea class="p-4 h-96 w-full outline-none resize-none border-4 border-ink font-display font-medium"
			placeholder="Décrivez le problème que vous rencontrez, il sera lu par un humain.">
		</textarea>
		<div class="font-display font-black text-2xl uppercase px-4 py-2 border-4 border-orange text-orange bg-papier
			absolute bottom-0 right-0 z-30 cursor-pointer select-none hover:bg-orange hover:text-papier transition-colors">
			Envoyer
			<div class="absolute -top-4 -left-4 bg-transparent border-l-4 border-t-4 -z-10 border-ink
				w-[calc(100%+20px)] h-[calc(100%+20px)] "/>
			<div class="absolute -top-3 -right-1 bg-papier -z-10 w-1 h-2"/>
			<div class="absolute -bottom-1 -left-3 bg-papier -z-10 w-2 h-1"/>
		</div>
	</div>
</main>

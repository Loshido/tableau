export default function SloganInscription() {
    return <section class="py-32 px-4 px-base relative
        border-b border-papier/25 bg-ink text-papier">
		<div class="hidden xl:block absolute top-0 w-px -ml-1 h-full
        	md:left-8 lg:left-[round(up,2vw,24px)] xl:left-[round(up,7vw,24px)] 2xl:left-[round(up,20vw,24px)]
            bg-linear-180 to-25% from-ink to-papier/25"/>
        <p class="font-mono font-light text-orange uppercase tracking-tighter text-lg">
            Pas encore de compte ?
        </p>
        <h2 class="text-4xl md:text-7xl font-bold font-display uppercase w-full md:w-2/3 mb-4">
            Inscription en 30 secondes avec votre office
        </h2>
        <a href="/auth/branch" rel="external" preload={false}>
            <div class="font-display font-semibold uppercas text-4xl px-4 py-2.5 sm:px-8 sm:py-5
                bg-orange text-papier select-none w-fit cursor-pointer uppercase
                tracking-normal hover:tracking-[25%] transition-[letter-spacing]">
                S'inscrire
            </div>
        </a>
    </section>
}

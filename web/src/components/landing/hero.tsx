const AnimatedWords = (props: { words: string[] }) => props.words.map(word => <span 
    class="tracking-normal hover:tracking-wide transition-[letter-spacing]">
    {word}
</span>)

export default function Hero() {
    return <section class="min-h-[80vh] py-16 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
        bg-orange text-ink
        bg-linear-0 from-orange to-orange-dark/25">
        <p class="text-sm font-mono font-light uppercase mb-8">
            Vie associative en école d'ingénieur
        </p>
        <h2 class="text-5xl md:text-7xl font-display font-black uppercase mb-8">
            Tous les<br/> évènements <br/>de l'isen. <br/>Un seul tableau.
        </h2>
        <p class="text-lg md:text-2xl mb-4 max-w-2/3">
            <AnimatedWords words={[
                "Soirées,", " Hackatons,", " galas,",
                " forums,", " tournois,", " confs" 
            ]}/>... chaque asso poste de son côté.
            Toi, tu regardes <strong>un seul endroit</strong> — et tu ne rates plus rien.
        </p>

        <a href="/auth">
            <div class="font-display uppercas text-4xl px-4 sm:px-8 py-2.5 sm:py-5
                    bg-ink text-papier select-none w-fit cursor-pointer uppercase
                    font-normal hover:font-black transition-[font-weight]">
                Inscrit toi au prochain évènement
            </div>
        </a>
    </section>
}
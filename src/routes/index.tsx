import Logo from "../components/logo/mod";
import Placeholder from "../components/placeholder";
import PunchDiamonds from "../components/punch/diamonds/mod"
import PunchDiamondsTeeth from "../components/punch/diamonds-teeth/mod"
import Fonctions from "../components/landing/fns/mod";

const AnimatedWords = (props: { words: string[] }) => props.words.map(word => <span 
    class="tracking-normal hover:tracking-wide transition-[letter-spacing]">
    {word}
</span>)

export default () => <div class="bg-papier min-h-screen w-screen">
    <header class="w-full bg-orange border-b-2 border-ink p-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
        flex justify-between flex-wrap gap-2 items-center">
        <a href="/">
            <Logo/>
        </a>
        <nav class="flex items-center gap-2">
            <a href="" class="px-4 py-2 bg-ink text-papier font-mono text-sm uppercase 
                font-normal hover:font-black transition-[font-weight]">
                Espace étudiant
            </a>
            <a href="" class="hidden sm:block px-4 py-2 bg-papier text-ink font-mono text-sm uppercase 
                font-normal hover:font-black transition-[font-weight]">
                Espace association
            </a>
        </nav>
    </header>

    <section class="min-h-[80vh] py-16 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
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

        <div class="font-display uppercas text-4xl px-8 py-5  
                bg-ink text-papier select-none w-fit cursor-pointer uppercase
                font-normal hover:font-black transition-[font-weight]
                ">
            Inscrit toi au prochain évènement
        </div>
    </section>

    <PunchDiamonds to="papier"/>

    <section class="min-h-[80vh] py-16 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw] bg-papier text-ink">
        <p class="font-mono font-medium uppercase text-xl font-stretch-150% tracking-widest text-orange-dark mb-2">
            Le programme de l'année
        </p>
        <p class="text-3xl font-display font-bold uppercase w-3/5 mb-2">
            Les temps forts, du premier jour à la remise des diplômes.
        </p>
        <p class="mb-8">
            Une sélection des rendez-vous qui rythment l'année et dessinent la vie étudiante de l'école.
        </p>

        <div class="h-[66vh] overflow-x-auto">
            <article class="h-full xl:w-[33vw] border-5 border-ink relative grid grid-rows-5">
                <p class="px-2 py-0.5 uppercase font-mono font-light border border-ink bg-ink text-papier absolute top-2 left-2">
                    04 sept
                </p>
                <p class="px-2 py-0.5 uppercase font-mono font-light border border-ink bg-papier text-ink absolute top-2 right-2">
                    Soirées
                </p>

                <div class="row-span-3 border-b-5 w-full h-full border-ink">
                    <Placeholder/>
                </div>
                <div class="row-span-2 w-full h-full p-8 flex flex-col gap-3">
                    <h2 class="text-5xl font-bold text-nowrap">
                        Weekend d'intégration
                    </h2>
                    <div class="font-mono uppercase font-light text-ink/50">
                        BDE - PARC DU LAC
                    </div>
                    <p>
                        Le grand départ. Deux jours pour rencontrer ta promo avant même la première rentrée des cours.
                    </p>
                    <a href="">En savoir plus</a>
                </div>
            </article>
        </div>
    </section>

    <PunchDiamondsTeeth from="papier" to="orange" />

    <Fonctions 
        hauteur_fn={35}
        fns={[
            "Centraliser tous les événements",
            "Ne plus rater une soirée",
            "Être informer en temps réel",
            "Découvrir les associations"
        ]}/>
    {/* <section class="min-h-[80vh] py-16 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw] bg-orange text-ink">
        <p class="font-mono font-medium uppercase text-xl font-stretch-150% tracking-widest text-ink/70 mb-2">
            Fonctionnalités
        </p>
        <h2 class="text-4xl md:text-6xl font-display font-bold uppercase mb-12">
            Tout ce dont tu as besoin, au même endroit.
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-papier text-ink p-6 border-2 border-ink/20 hover:border-ink transition-colors">
                <div class="text-orange-dark mb-4">
                    <User class="w-8 h-8" />
                </div>
                <h3 class="text-2xl font-display font-bold uppercase mb-2">
                    Inscription en ligne
                </h3>
                <p class="text-sm">
                    Crée ton compte en 30 secondes avec ton Office 365 et accède à toutes les fonctionnalités.
                </p>
            </div>

            <div class="bg-papier text-ink p-6 border-2 border-ink/20 hover:border-ink transition-colors">
                <div class="text-orange-dark mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <h3 class="text-2xl font-display font-bold uppercase mb-2">
                    Notifications
                </h3>
                <p class="text-sm">
                    Reçois des alertes en temps réel sur ton téléphone ou par mail pour ne rien rater.
                </p>
            </div>

            <div class="bg-papier text-ink p-6 border-2 border-ink/20 hover:border-ink transition-colors">
                <div class="text-orange-dark mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
                <h3 class="text-2xl font-display font-bold uppercase mb-2">
                    Une seule interface
                </h3>
                <p class="text-sm">
                    Tous les événements des associations en un coup d’œil, sans avoir à checker chaque groupe.
                </p>
            </div>

            <div class="bg-papier text-ink p-6 border-2 border-ink/20 hover:border-ink transition-colors">
                <div class="text-orange-dark mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h3 class="text-2xl font-display font-bold uppercase mb-2">
                    Vitrine des associations
                </h3>
                <p class="text-sm">
                    Découvre toutes les assos de l’école, leurs membres, leurs projets et leurs événements.
                </p>
            </div>

            <div class="bg-papier text-ink p-6 border-2 border-ink/20 hover:border-ink transition-colors">
                <div class="text-orange-dark mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                </div>
                <h3 class="text-2xl font-display font-bold uppercase mb-2">
                    Promouvoir tes événements
                </h3>
                <p class="text-sm">
                    Utilise l’onglet Découverte pour mettre en avant tes événements et toucher plus d’étudiants.
                </p>
            </div>
        </div>
    </section> */}
    <section class="py-32 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw] relative
        border-b border-papier/25 bg-ink text-papier">
        <p class="font-mono font-light text-orange uppercase tracking-tighter text-lg">
            Pas encore de compte ? 
        </p>
        <h2 class="text-4xl md:text-7xl font-bold font-display uppercase w-full md:w-2/3 mb-4">
            Inscription en 30 secondes avec votre office
        </h2>
        <div class="font-display font-semibold uppercas text-4xl px-4 py-2.5 sm:px-8 sm:py-5  
            bg-orange text-papier select-none w-fit cursor-pointer uppercase
            tracking-normal hover:tracking-[25%] transition-[letter-spacing]">
            S'inscrire
        </div>
    </section>
    <footer class="flex flex-row flex-wrap gap-y-4 items-center justify-between py-8 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
        uppercase text-xs font-mono font-thin bg-ink text-papier">
        <p>
            Le Tableau - fait par des étudiants, pour des étudiants.
        </p>
        <nav class="flex flex-row items-center gap-2 -mx-1">
            <a href="" class="relative before:absolute before:bottom-0 before:left-0 before:w-full 
                before:h-0 hover:before:h-full before:bg-orange px-1 py-0.5 hover:font-semibold transition-[font-weight]
                hover:before:text-ink before:transition-[height] before:-z-10 z-10">
                Contact
            </a>
            <a href="" class="relative before:absolute before:bottom-0 before:left-0 before:w-full 
                before:h-0 hover:before:h-full before:bg-orange px-1 py-0.5 hover:font-semibold transition-[font-weight]
                hover:before:text-ink before:transition-[height] before:-z-10 z-10">
                Github
            </a>
        </nav>
    </footer>
</div>
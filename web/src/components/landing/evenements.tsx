import Placeholder from "~/components/placeholder";
import Chevron from "~/components/icons/chevron";

const Evenement = () => <article class="h-full xl:w-[33vw] border-5 border-ink relative grid grid-rows-7 snap-start
    scroll-mx-4 md:scroll-mx-8 lg:scroll-mx-[5vw] xl:scroll-mx-[23vw]">
    <p class="px-2 py-0.5 uppercase font-mono font-light bord<er border-ink bg-ink text-papier absolute top-2 left-2">
        04 sept
    </p>
    <p class="px-2 py-0.5 uppercase font-mono font-light border border-ink bg-papier text-ink absolute top-2 right-2">
        Soirées
    </p>
    <div class="row-span-4 border-b-5 w-full h-full border-ink">
        <Placeholder/>
    </div>
    <div class="row-span-3 w-full h-full p-4 sm:p-8 flex flex-col gap-1 sm:gap-3">
        <h2 class="text-2xl sm:text-5xl font-bold text-nowrap truncate">
            Weekend d'intégration
        </h2>
        <div class="font-mono uppercase font-light text-ink/50 truncate">
            BDE - PARC DU LAC
        </div>
        <p class="text-sm sm:text-base line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quas iste, accusantium nisi nulla ea corrupti, suscipit incidunt earum quis voluptas nihil. Enim maiores fuga quae, nisi aliquid delectus nostrum?
            Le grand départ. Deux jours pour rencontrer ta promo avant même la première rentrée des cours.
        </p>

        <a href="#" class="text-orange uppercase font-stretch-50% text-sm hover:font-medium
            transition-[font-weight] flex flex-row items-center gap-1 group">
            En savoir plus <Chevron class="w-3 h-3 stroke-orange stroke-3 group-hover:stroke-4 transition-[stroke]"/>
        </a>
    </div>
</article>

const GAP = 16 // 16px gap between articles

function scrollToLeft() {
    const events = document.getElementById("events") as HTMLDivElement
    const article = events.querySelector('article') as HTMLDivElement
    const articleWidth = article.getBoundingClientRect().width
    const left = events.scrollLeft - GAP - articleWidth

    events.scrollTo({
        top: 0,
        left
    })
}

function scrollToRight() {
    const events = document.getElementById("events") as HTMLDivElement
    const article = events.querySelector('article') as HTMLDivElement
    const articleWidth = article.getBoundingClientRect().width
    const left = events.scrollLeft + GAP + articleWidth

    events.scrollTo({
        top: 0,
        left
    })
}

export default function Evenements() {
    return <section class="min-h-[80vh] py-16 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw] bg-papier text-ink">
        <p class="font-mono font-medium uppercase text-xl font-stretch-150% tracking-widest text-orange-dark mb-2 relative">
            Le programme de l'année
        </p>
        <p class="text-3xl font-display font-bold uppercase w-3/5 mb-2">
            Les temps forts, du premier jour à la remise des diplômes.
        </p>

        <div class="relative mb-8">
            <p>
                Une sélection des rendez-vous qui rythment l'année et dessinent la vie étudiante de l'école.
            </p>

            <div class="absolute bottom-0 right-0 flex-row gap-2 hidden md:flex">
                <div class="w-8 h-8 border-4 border-orange cursor-pointer group" onClick={scrollToLeft}>
                    <Chevron class="w-6 h-6 stroke-orange stroke-4 rotate-180 group-hover:-translate-x-1 group-hover:transition-transform"/>
                </div>
                <div class="w-8 h-8 border-4 border-orange cursor-pointer group" onClick={scrollToRight}>
                    <Chevron class="w-6 h-6 stroke-orange stroke-4 group-hover:translate-x-1 group-hover:transition-transform"/>
                </div>
            </div>
        </div>

        <div id="events" class="h-[66vh] w-screen overflow-x-auto flex flex-row gap-4
            -mx-4 md:-mx-8 lg:mx-[-5vw] xl:mx-[-23vw] scroll-mt-1
            px-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
            scrollbar-none snap-mandatory snap-x
            ">
            <Evenement/>
            <Evenement/>
            <Evenement/>
            <Evenement/>
            <Evenement/>
        </div>
    </section>
}

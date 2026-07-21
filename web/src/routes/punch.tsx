import PunchDiamonds from "../components/punch/diamonds/mod"
import PunchDiamondsConfetti from "../components/punch/diamonds-confetti/mod"
import PunchDiamondsDuo from "../components/punch/diamonds-duo/mod"
import PunchDiamondsQuinconce from "../components/punch/diamonds-quinconce/mod"
import PunchDiamondsTeeth from "../components/punch/diamonds-teeth/mod"
import PunchDiamondsTight from "../components/punch/diamonds-tight/mod"

export default () => <section class="bg-papier text-ink p-12 min-h-screen w-screen">
    <h1 class="font-display font-extrabold uppercase text-4xl mb-2">
        Losanges — variantes
    </h1>

    <div class="mb-14 text-xs">
        <div class="font-details font-light uppercase opacity-60 mb-2.5 flex items-center gap-2.5">
            Référence <code class="bg-ink text-papier px-2 py-0.5 font-details font-light">diamonds</code>
        </div>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-orange text-ink">Section du dessus</div>
        <PunchDiamonds/>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-navy text-orange">Section du dessous</div>
    </div>
    <div class="mb-14 text-xs">
        <div class="font-details font-light uppercase opacity-60 mb-2.5 flex items-center gap-2.5">
            Référence <code class="bg-ink text-papier px-2 py-0.5 font-details font-light">diamonds-teeth</code>
        </div>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-orange text-ink">Section du dessus</div>
        <PunchDiamondsTeeth/>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-navy text-orange">Section du dessous</div>
    </div>
    <div class="mb-14 text-xs">
        <div class="font-details font-light uppercase opacity-60 mb-2.5 flex items-center gap-2.5">
            Référence <code class="bg-ink text-papier px-2 py-0.5 font-details font-light">diamonds-confetti</code>
        </div>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-orange text-ink">Section du dessus</div>
        <PunchDiamondsConfetti/>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-navy text-orange">Section du dessous</div>
    </div>
    <div class="mb-14 text-xs">
        <div class="font-details font-light uppercase opacity-60 mb-2.5 flex items-center gap-2.5">
            Référence <code class="bg-ink text-papier px-2 py-0.5 font-details font-light">diamonds-duo</code>
        </div>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-orange text-ink">Section du dessus</div>
        <PunchDiamondsDuo/>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-navy text-orange">Section du dessous</div>
    </div>
    <div class="mb-14 text-xs">
        <div class="font-details font-light uppercase opacity-60 mb-2.5 flex items-center gap-2.5">
            Référence <code class="bg-ink text-papier px-2 py-0.5 font-details font-light">diamonds-quinconce</code>
        </div>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-orange text-ink">Section du dessus</div>
        <PunchDiamondsQuinconce/>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-navy text-orange">Section du dessous</div>
    </div>
    <div class="mb-14 text-xs">
        <div class="font-details font-light uppercase opacity-60 mb-2.5 flex items-center gap-2.5">
            Référence <code class="bg-ink text-papier px-2 py-0.5 font-details font-light">diamonds-tight</code>
        </div>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-orange text-ink">Section du dessus</div>
        <PunchDiamondsTight/>
        <div class="h-16 flex items-center px-5 font-details font-light uppercase bg-navy text-orange">Section du dessous</div>
    </div>
</section>
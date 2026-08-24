import { createSignal, For } from "solid-js";
import { Text } from "~/components/logo/mod";
import "./animation.css"
import { onSettled } from "solid-js";

interface FonctionsProps {
    fns: string[],
    hauteur_fn?: number // default 50dvh
}

export default function Fonctions({ fns, hauteur_fn }: FonctionsProps) {
	const [activeIndex, setActiveIndex] = createSignal(0)
    onSettled(() => {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            const intersecting = entry.isIntersecting

            if(intersecting) setActiveIndex(index)
        }), {
        })

		document.querySelectorAll('.fonction').forEach(fn => observer.observe(fn))

		return () =>  observer.disconnect()
    })


    return <section class="fns px-4 md:px-8 lg:px-[5vw] xl:px-[23vw] bg-orange text-papier relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0 h-full"
            style="width: round(20dvw, 24px); height: round(up, 100%, 24px);z-index:5;">
            <defs>
                <pattern id="a" width="24" height="24" patternUnits="userSpaceOnUse">
                    <polygon points='12,3 21,12 12,21 3,12' fill='var(--color-orange-dark)'/>
                </pattern>
            </defs>
            <rect width="800%" height="800%" fill="url(#a)"/>
        </svg>
        <div class="h-screen w-full flex flex-col justify-center sticky top-0 z-20">
            <div class="absolute top-0 h-[80dvh] sm:h-[85dvh] mt-[-40dvh] pointer-events-none">
                <div class="font-mono font-extralight uppercase sticky top-0
                    flex flex-row items-center gap-2 pt-[50dvh]
                    w-full pointer-events-none">
                    Pourquoi utiliser <Text /> ?
                </div>
            </div>
            <For each={fns}>
                {(fonction, i) => <h1 class={(activeIndex() == i() ? 'fn-active' : 'fn-inactive') +
                    ` text-4xl font-bold uppercase p-4`}>
                    {fonction}
                </h1>}
            </For>
        </div>

        <For each={fns}>
            {(_, i) => <div data-index={i()} class="fonction w-full"
                style={`height: ${hauteur_fn || 50}dvh`}/>}
        </For>
    </section>
}

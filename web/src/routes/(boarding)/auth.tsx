import { onMount } from "solid-js";
import Header from "~/components/header";
import "~/components/auth/style.css"

const randomizeTableau = (tableau: HTMLDivElement) => {
    tableau.style.animationName = 'none'
    void tableau.offsetWidth;

    const w = window.innerWidth
    const h = window.innerHeight

    const opacity = Math.floor(Math.random() * 100) / 100
    const rotation = Math.floor(Math.random() * 10 * 180) + 'deg'
    const from_angle = Math.random() * Math.PI * 2
    const from_x = Math.floor(Math.cos(from_angle) * (w * 0.6 + 64) + w * 0.5)
    const from_y = Math.floor(Math.sin(from_angle) * (h * 0.6 + 64) + h * 0.5)

    const to_angle = Math.random() * Math.PI * 2
    const to_x = Math.floor(Math.cos(to_angle) * (w * 0.6 + 64) + w * 0.5)
    const to_y = Math.floor(Math.sin(to_angle) * (h * 0.6 + 64) + h * 0.5)

    tableau.style.animationDelay = Math.random() * 10 + 's'
    tableau.style.animationDuration = (10 + Math.random() * 10) + 's'

    tableau.style.opacity = opacity.toString()
    tableau.style.setProperty('--from-x', from_x + 'px')
    tableau.style.setProperty('--from-y', from_y + 'px')
    tableau.style.setProperty('--to-x', to_x + 'px')
    tableau.style.setProperty('--to-y', to_y + 'px')
    tableau.style.setProperty('--rotation', rotation)

    tableau.style.animationName = 'stars'
    tableau.style.display = 'block'
}

export default () => {
    onMount(() => {
        const tableaux = document.querySelectorAll<HTMLDivElement>('.tableau')

        tableaux.forEach(tableau => {
            tableau.style.top = '-32px'
            tableau.style.left = '-32px'
            tableau.style.animationFillMode = 'forwards'
            randomizeTableau(tableau)

            tableau.addEventListener("animationend", () => randomizeTableau(tableau))
        })
    })

    return <div class="bg-papier min-h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
        <Header logo_href="/auth" className="border-b-2 border-ink bg-papier absolute top-0 left-0 z-10"
            links={[
                {
                    titre: "Accueil",
                    href: "/",
                    className: "bg-ink text-papier"
                }
            ]} />

        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-orange z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-orange z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-orange z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-orange z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-orange z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-ink z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-ink z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-ink z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-ink z-0 pointer-events-none"/>
        <div class="tableau hidden w-8 h-8 absolute top-0 left-0 border-8 border-ink z-0 pointer-events-none"/>

        <div class="px-4 md:p-0 md:w-2/3 lg:w-1/3 z-10">
            <p class="font-mono font-thin uppercase mb-2">
                connexion | inscription
            </p>
            <h2 class="text-4xl md:text-6xl font-black font-display mb-4">
                UN SEUL COMPTE. <br/>CELUI DE TON ÉCOLE.
            </h2>

            <a href="/boarding/associations" class="flex flex-row gap-4 items-center mb-4
                font-display uppercase px-4 sm:px-8 py-2.5 sm:py-5 w-fit
                bg-ink hover:bg-orange text-papier select-none cursor-pointer
                font-normal hover:font-black transition-[font-weight,background-color]">
                <svg width="20" height="20" viewBox="0 0 21 21">
                    <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
                    <rect x="11" y="0" width="10" height="10" fill="#7FBA00"/>
                    <rect x="0" y="11" width="10" height="10" fill="#00A4EF"/>
                    <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
                </svg>

                Se connecter avec Microsoft
            </a>
            <p class="font-mono font-thin text-xs">
                Utilise ton adresse @isen.yncrea.fr ou @yncrea.fr. <br/>
                Aucun autre compte n'est accepté.
            </p>
        </div>
    </div>
}

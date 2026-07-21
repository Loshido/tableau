export default function Footer() {
    return <footer class="flex flex-row flex-wrap gap-y-4 items-center justify-between py-8 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
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
}
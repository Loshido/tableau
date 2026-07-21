import Logo, { type LogoProps } from "~/components/logo/mod"

interface HeaderProps {
    logo_href?: string,
    logo_props?: LogoProps,
    className?: string
    links: {
        titre: string,
        className?: string,
        href: string
    }[]
}

export default function Header(props: HeaderProps) {
    return <header class={`w-full p-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
        flex justify-between flex-wrap gap-2 items-center
        ${props.className || "border-b-2 border-ink"}`}>
        <a href={props.logo_href || "/"}>
            <Logo {...props.logo_props} />
        </a>
        <nav class="flex items-center gap-2">
            {
                props.links.map(link => <a href={link.href} class={`px-4 py-2 ${ link.className || "bg-papier text-ink"} 
                    font-mono text-sm uppercase font-normal hover:font-black transition-[font-weight]`}>
                    {link.titre}
                </a>)
            }
        </nav>
    </header>
}
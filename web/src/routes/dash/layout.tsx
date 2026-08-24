import Navigation from "./layout-nav"
import { onSettled, ParentProps } from "solid-js";
import Logo from "~/components/logo/mod"

const createListener = (slide: HTMLDivElement) => {
	return (event: MouseEvent) => {
		const target = event.target as HTMLAnchorElement
		const rect = target.getBoundingClientRect()
		if (target.tagName !== "A" || !rect) return
		if (slide.getAttribute('slide-in') === target.href) return

		slide.setAttribute('slide-in', target.href)
		slide.style.opacity = '1'
		slide.style.top = `${rect.top}px`;
        slide.style.left = `${rect.left}px`;
        slide.style.width = `${rect.width}px`;
        slide.style.height = `${rect.height}px`;
	}
}

export default ({ children }: ParentProps) => {
	let nav: HTMLElement | undefined;
	let slider: HTMLDivElement | undefined

	onSettled(() => {
		if (!nav || !slider) return

		const listener = createListener(slider)
		nav.parentNode?.addEventListener('mouseout', e => {
			const target = e.target as HTMLElement | null
			if(!target || target.tagName !== "HEADER") return
			slider.setAttribute('slide-in', '')
			slider.style.opacity = '0'
		})

		nav.querySelectorAll<HTMLAnchorElement>('a')
			.forEach(link => link.addEventListener('mouseover', listener))
	})

	return <div class="flex flex-col min-h-svh w-full">
		<header class="w-full p-4 md:px-8 lg:px-[5vw] xl:px-[23vw] relative
	    	flex justify-between flex-wrap gap-2 items-center border-b-2 border-ink bg-orange">
		    <a href="/dash/discover">
		        <Logo />
			</a>
			<nav class="flex flex-row items-center flex-wrap gap-2 font-mono text-sm uppercase select-none *:z-10" ref={nav}>
				<div ref={slider} class="opacity-0 cursor-pointer z-0 absolute bg-ink/75
					pointer-events-none transition-[top,left,width,height,opacity]" />
			    <Navigation/>
		    </nav>
		</header>
		{children}
	</div>
}

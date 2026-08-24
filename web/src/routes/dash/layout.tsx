import Navigation from "./layout-nav"
import { ComponentProps, onMount } from "solid-js";
import Logo from "~/components/logo/mod"

const createListener = (slide: HTMLDivElement, rects: Map<Element, DOMRect>) => {
	return (event: MouseEvent) => {
		const target = event.target as HTMLAnchorElement
		// const rect = rects.get(target)
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


export default ({ children, ...props }: ComponentProps<'div'>) => {
	let nav: HTMLElement | undefined;
	let slider: HTMLDivElement | undefined

	onMount(() => {
		if (!nav || !slider) return
		const rects = new Map<Element, DOMRect>()

		const listener = createListener(slider, rects)
		nav.parentNode?.addEventListener('mouseout', e => {
			const target = e.target as HTMLElement | null
			if(!target || target.tagName !== "HEADER") return
			slider.setAttribute('slide-in', '')
			slider.style.opacity = '0'
		})

		nav.querySelectorAll<HTMLAnchorElement>('a')
			.forEach(link => {
				rects.set(link, link.getBoundingClientRect())
				link.addEventListener('mouseover', listener)
			})
	})

	return <div {...props} class="flex flex-col h-full w-full">
		<header class="w-full p-4 md:px-8 lg:px-[5vw] xl:px-[23vw] relative
	    	flex justify-between flex-wrap gap-2 items-center border-b-2 border-ink bg-orange">
		    <a href="/dash">
		        <Logo />
			</a>
			<nav class="flex flex-row items-center flex-wrap gap-2 font-mono text-sm uppercase select-none *:z-10" ref={nav}>
				<div ref={slider} class="opacity-0 cursor-pointer z-0 absolute bg-ink
					pointer-events-none transition-[top,left,width,height,opacity]" />
			    <Navigation/>
		    </nav>
		</header>
		{children}
	</div>
}

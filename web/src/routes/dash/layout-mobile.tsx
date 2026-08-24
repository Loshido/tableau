import Logo from "~/components/logo/mod"
import Navigation from "./layout-nav"
import { ComponentProps } from "solid-js"

export default ({ children, ...props }: ComponentProps<'div'>) => {
	return <div {...props} class="flex flex-col min-h-svh w-full ">
		<header class="w-full p-4 md:px-8 lg:px-[5vw] xl:px-[23vw] sticky top-0 left-0 isolate z-50
	    	flex justify-between flex-wrap gap-2 items-center border-b-2 border-ink bg-orange">
		    <a href="/dash">
		        <Logo />
			</a>
			<label for="dropdown-checkbox" class="relative">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"

					class="w-10 h-10 p-2 cursor-pointer bg-ink/25 stroke-papier">
					<path class="down" d="m7 15 5 5 5-5" />
					<path class="up" d="m7 9 5-5 5 5" />
				</svg>
				<input id="dropdown-checkbox" type="checkbox" value="dropdown"
					class="pointer-events-none absolute top-0 left-0 w-full h-full opacity-0" />
			</label>
			<style>{`
				body:has(#dropdown-checkbox:checked) {
					transition: background-color .3s ease;
					background-color: var(--color-orange);
				}

				:has(#dropdown-checkbox:checked) .down {
					transition: transform .3s ease;
					transform-origin: 50% 75%;
					transform: scaleY(-1);
				}
				:has(#dropdown-checkbox:not(:checked)) .down {
					transition: transform .3s ease;
					transform-origin: 50% 75%;
					transform: scaleY(1);
				}
				:has(#dropdown-checkbox:checked) .up {
					transition: transform .3s ease;
					transform-origin: 50% 25%;
	    			transform: scaleY(-1);
				}
				:has(#dropdown-checkbox:not(:checked)) .up {
					transition: transform .3s ease;
		  			transform-origin: 50% 25%
					transform: scaleY(1);
				}
				header:has(#dropdown-checkbox:checked) > nav {
					display: flex;
				}
				html:has(#dropdown-checkbox:checked) {
					overflow: hidden
				}

			`}</style>
			<nav class="hidden absolute flex-col items-start flex-nowrap gap-4 top-full left-0 bg-orange p-4
				h-[calc(100svh-100%)] w-full font-mono text-2xl uppercase"
				onClick={e => {
					const target = e.target as HTMLElement | null
					const checkbox = document.getElementById('dropdown-checkbox') as HTMLInputElement | null
					if (target && target.tagName === "NAV" && checkbox) {
						checkbox.checked = false
					}
				}}>
				<Navigation/>
		    </nav>
		</header>
		{children}
	</div>
}

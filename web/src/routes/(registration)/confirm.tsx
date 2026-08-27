import { lazy } from "solid-js"
import Logo from "~/components/logo/icon"

const Grain = <svg viewBox="0 0 700 700"
	class="absolute top-0 left-0 w-auto h-screen pointer-events-none z-0!">
	<defs>
		<filter id="nnnoise-filter-orange" x="-20%" y="-20%" width="100%" height="100%" filterUnits="objectBoundingBox"
			primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
			<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="15" stitchTiles="stitch"
				x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
			<feSpecularLighting surfaceScale="25" specularConstant="3" specularExponent="20" lighting-color="var(--color-orange)"
				x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
    			<feDistantLight azimuth="3" elevation="81"></feDistantLight>
  			</feSpecularLighting>
		</filter>
		<filter id="nnnoise-filter" x="-20%" y="-20%" width="100%" height="100%" filterUnits="objectBoundingBox"
			primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
			<feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="15" stitchTiles="stitch"
				x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
			<feSpecularLighting surfaceScale="15" specularConstant="3" specularExponent="20" lighting-color="#FFF"
				x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
    			<feDistantLight azimuth="3" elevation="81"></feDistantLight>
  			</feSpecularLighting>
		</filter>
	</defs>
	<rect width="100%" height="100%" fill="transparent" filter="url(#nnnoise-filter)" opacity="0.05"
		style="mix-blend-mode: soft-light; z-index: 10;" />
</svg>

const AddToAppleWallet = lazy(() => import("~/components/event/add-to-apple-wallet"))
const AddToWallet = lazy(() => import("~/components/event/add-to-wallet"))

export default () => {
	return <div class="bg-papier flex-1 h-full w-full flex flex-col gap-4 relative overflow-hidden
    	p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw] 2xl:px-[33vw]">
		<section>
		   	<p class="font-mono uppercase font-light text-orange text-sm">
				Confirmation
			</p>
			<h2 class="font-display leading-8 font-black text-2xl uppercase">
				Votre inscription est confirmée
			</h2>
		</section>

		<div class="w-72 h-[40dvh] bg-zinc-700 relative text-papier font-display p-2
			flex flex-col overflow-hidden *:z-20">
			<p class="uppercase text-papier/50">
				ticket <span class="font-black text-papier">__AE</span>
			</p>
			<p class="uppercase text-papier/50">
				event <span class="text-papier font-black">NUIT DU CODE</span>
			</p>
			<p class="uppercase text-papier/50">
				date <span class="text-papier font-black">03/02/2006 - 16h</span>
			</p>
			<p class="uppercase text-papier/50">
				org <span class="text-papier font-black">ISENENGINEERING</span>
			</p>
			<p class="uppercase text-papier/50">
				id <span class="text-papier font-black">PRENOM NOMMMMMMMMM</span>
			</p>

			<div class="w-32 h-32 bg-black mt-auto z-50! flex items-center justify-center">
				<p class="text-xs font-display font-black">QRCode</p>
			</div>
			<div class="absolute bottom-2 right-2 z-50!" title="by Tableau">
				<Logo color="var(--color-papier)"/>
			</div>

			{Grain}
		</div>

		<div class="flex flex-row flex-wrap items-center gap-4">
			<a href="/dash/registrations" class="px-4 py-2 bg-ink text-papier w-fit
				font-mono text-sm uppercase font-normal hover:font-black transition-[font-weight]">
				Inscriptions
			</a>

			<div class="cursor-pointer">
				<AddToAppleWallet/>
			</div>
			<div class="cursor-pointer">
				<AddToWallet/>
			</div>
		</div>
	</div>
}

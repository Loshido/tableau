const STYLE = `
.punch-diamonds-duo::before{
    content:""; position:absolute; inset:0; background-color: hsl(from var(--color-ink) h s l / 0.1);
    -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='26'%3E%3Cpolygon points='12,3 22,13 12,23 2,13' fill='white'/%3E%3Cpolygon points='30,8 35,13 30,18 25,13' fill='white'/%3E%3C/svg%3E");
    mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='26'%3E%3Cpolygon points='12,3 22,13 12,23 2,13' fill='white'/%3E%3Cpolygon points='30,8 35,13 30,18 25,13' fill='white'/%3E%3C/svg%3E");
    -webkit-mask-repeat:repeat; mask-repeat:repeat;
    -webkit-mask-size:40px 26px; mask-size:40px 26px;
}
.punch-diamonds-duo.shining::before{
	animation: shining 7s ease-in-out infinite, moving 5s linear infinite;
}

@keyframes shining {
	0%, 33%, 66%, 100% { background-color: hsl(from var(--color-papier) h s l / 0.15) }
	16.5%, 50%, 82.5% { background-color: hsl(from var(--color-papier) h s l / 0.05) }
}
@keyframes moving {
	from { mask-position: 0 0 }
	to { mask-position: 40px 0 }
}
@keyframes adjusting {
	from { width: 0 }
	to { width: var(--chargement) }
}`

export default (props: { xp: number, xp_max: number }) => <section
	class="relative p-4 sm:p-6 md:p-8 border-2 border-ink flex flex-row items-center justify-between z-0">
	<div class="absolute top-0 left-0 bg-orange h-full w-(--chargement) -z-10
		punch-diamonds-duo shining animate-[adjusting_1s_ease]"
		style={`--chargement: ${Math.round(props.xp / props.xp_max * 100)}%;`} />
	<style>{STYLE}</style>
	<div class="flex flex-col">
		<p class="text-sm font-mono text-ink uppercase leading-2">Solde d'engagement</p>
		<h2 class="text-5xl sm:text-6xl md:text-8xl font-black text-ink">
			{props.xp}<span class="text-2xl sm:text-3xl md:text-4xl">XP </span>
			<span class="text-ink/20">/{props.xp_max}<span class="text-2xl sm:text-3xl md:text-4xl">XP</span></span>
		</h2>
	</div>
</section>

interface LabelProps {
	association: string,
	collapsible: boolean
}

export default (props: LabelProps) => {
	return <label class="relative flex flex-row items-center gap-2 cursor-pointer select-none group
		has-disabled:cursor-default">
		<h3 class="font-display leading-8 font-black text-4xl uppercase">
			{props.association}
		</h3>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"
			class="w-6 h-6 transition-[rotate] group-[:has(:disabled)]:hidden
			group-[:has(:checked)]:rotate-90
			group-hover:rotate-45">
			<path d="m9 18 6-6-6-6"  />
		</svg>
		<input id="toggle-isenengineering" type="checkbox"
			checked={!props.collapsible} disabled={!props.collapsible}
			class="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none" />
	</label>
}

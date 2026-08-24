import Balance from "./balance"
import Historic from "./historic"
import Actions from "./actions"

export default () => {
	return <main class="w-full h-full bg-papier flex flex-col gap-1 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<Balance xp={10000} xp_max={50000}/>

		<section class="mt-4 flex flex-col gap-8 md:flex-row">
			<div class="flex-7">
				<Historic/>
			</div>
			<div class="flex flex-col gap-1 flex-3">
				<Actions/>
			</div>
		</section>
	</main>
}

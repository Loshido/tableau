import Balance from "./balance"
import Actions from "./actions"
import Loading from "~/components/loading"
import { lazy } from "solid-js"
const Historic = lazy(() => import('./historic/mod'))

export default () => {
	return <main class="w-full h-full bg-papier flex flex-col gap-1 flex-1
		p-4 md:px-8 lg:px-[5vw] lg:py-8 xl:px-[23vw]">
		<Balance xp={10000} xp_max={50000}/>

		<section class="mt-4 flex flex-col gap-4 md:flex-row">
			<div class="flex-7 overflow-auto scrollbar-thumb-orange">
				<Loading titre="Chargement de la chronologie" class="h-full w-full">
					<Historic/>
				</Loading>
			</div>
			<div class="flex flex-col gap-1 flex-3">
				<Actions/>
			</div>
		</section>
	</main>
}

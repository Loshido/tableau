import { JSX } from "@solidjs/web/jsx-runtime"
import { Loading, ParentProps } from "solid-js"

type LoadingProps = { titre?: string } & JSX.ElementAttributes<HTMLDivElement>

export function LoadingPlaceholder({ titre, ...props }: LoadingProps) {
	return <div {...props} class={[
		"flex flex-row gap-4 md:gap-8 items-center justify-center",
		props.class ?? 'h-full w-full'
	]}>
		<div class="w-8 h-8 border-8 border-orange animate-spin" />
		{
			titre && <p class="font-display text-2xl w-fit md:text-4xl font-black">{titre}</p>
		}
	</div>
}

export default ({ titre, children, ...props }: LoadingProps & ParentProps) => <Loading
	fallback={<LoadingPlaceholder titre={titre} {...props} />}>
	{children}
</Loading>

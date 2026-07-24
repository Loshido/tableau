import "./style.css"
import type { JSX } from "solid-js"

type Props = {
    from?: string, to?: string
} & JSX.DOMAttributes<HTMLDivElement>

// export default (props: JSX.DOMAttributes<SVGSVGElement>) => <svg viewBox="0 0 24 24" 
//     {...props}
//     fill="none" >
//     <path d="m9 18 6-6-6-6"/>
// </svg>

export default ({from, to, ...props}: Props = { from: "orange", to: "navy" }) => {{
    const colorFrom = from || "orange"
    const colorTo = to || "navy"
    return <div {...props} style={`--a: var(--color-${colorFrom});--b: var(--color-${colorTo});` + (props.style ?? '')}
        class={"punch-diamonds-teeth w-full relative overflow-hidden " + (props.class ?? '')}/>
}}
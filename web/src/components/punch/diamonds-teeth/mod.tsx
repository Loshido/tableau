import { JSX } from "@solidjs/web/jsx-runtime"
import "./style.css"

type Props = {
    from?: string, to?: string
} & JSX.ElementAttributes<HTMLDivElement>

export default ({from, to, ...props}: Props = { from: "orange", to: "navy" }) => {{
    const colorFrom = from || "orange"
    const colorTo = to || "navy"
    return <div {...props} style={`--a: var(--color-${colorFrom});--b: var(--color-${colorTo});` + (props.style ?? '')}
        class={"punch-diamonds-teeth w-full relative overflow-hidden " + (props.class ?? '')}/>
}}

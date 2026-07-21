import "./style.css"

export default (props: { from?: string, to?: string } = { from: "orange", to: "navy" }) => {{
    const from = props.from || "orange"
    const to = props.to || "navy"
    return <div style={`--a: var(--color-${from});--b: var(--color-${to})`}
        class="punch-diamonds w-full relative overflow-hidden"/>
}}
    
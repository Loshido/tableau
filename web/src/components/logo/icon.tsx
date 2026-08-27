export default (props: { size?: number, color?: string }) => {
    const size = Math.max(props.size || 22)
    return <div class="border-5 relative font-stretch-expanded hover:rotate-90
        transition-none hover:transition-transform"
        style={`width: ${size}px; height: ${size}px; border-color: ${ props.color || "var(--color-ink)" }`}/>
}

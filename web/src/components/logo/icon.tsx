export default (props: { size?: number}) => {
    const size = Math.max(props.size || 22)
    return <div class="border-5 border-ink relative font-stretch-expanded hover:rotate-90 
        transition-none hover:transition-transform"
        style={`width: ${size}px; height: ${size}px`}/>
}
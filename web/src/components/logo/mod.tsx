import Icon from "./icon"
import Text from "./text"

export interface LogoProps {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
    icon_size?: number
}

export { Icon, Text }

export default (props: LogoProps) => {
    const size = props.size || 'xl'
    return <div class={`flex items-center gap-3 text-${size} group`}>
        <Icon size={props.icon_size}/>
        <Text/>
    </div>
}
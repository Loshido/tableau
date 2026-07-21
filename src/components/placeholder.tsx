export default () => <div class="w-full h-full overflow-hidden">
    <svg xmlns='http://www.w3.org/2000/svg' class="w-full h-full" viewBox='0 0 192 192'>
        <defs>
            <pattern id='tile' patternUnits='userSpaceOnUse' width='24' height='24'>
                <polygon points='12,3 21,12 12,21 3,12' fill='var(--color-orange)' stroke='var(--color-papier)' stroke-width='0.5'/>
            </pattern>
        </defs>
        <rect width='800%' height='800%' x={-100} y={-100} fill='url(#tile)' />
    </svg>
</div>
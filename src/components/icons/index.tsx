export const LinkIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256" width="24" height="24" fill="currentColor">
        <path d="M124 0c-68.5 0-124 55.5-124 124s55.5 124 124 124h44c13.3 0 24-10.7 24-24s-10.7-24-24-24h-44c-40.8 0-76-35.2-76-76s35.2-76 76-76h44c13.3 0 24-10.7 24-24s-10.7-24-24-24h-44zm264 0c68.5 0 124 55.5 124 124s-55.5 124-124 124h-44c-13.3 0-24-10.7-24-24s10.7-24 24-24h44c40.8 0 76-35.2 76-76s-35.2-76-76-76h-44c-13.3 0-24-10.7-24-24s10.7-24 24-24h44zM172 104c-13.3 0-24 10.7-24 24s10.7 24 24 24h168c13.3 0 24-10.7 24-24s-10.7-24-24-24H172z"/>
    </svg>

}

/**
 * Hand crafted open in new window icon, because my svg skills were rusty.
 * Normally I favor MaterialUI's icon set.
 */
export const NewWindowIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor" width="24" height="24">
        <g transform="translate(320,40)">
            <line x1="0" x2="170" y1="0" y2="0" strokeWidth="40"/>
            <line x1="150" x2="150" y1="-20" y2="165" strokeWidth="40"/>
        </g>
        <g transform="translate(-50,50)">
            <line x1="256" x2="512" y1="256" y2="0" strokeWidth="40"/>
        </g>
        <clipPath id="cut-off-upper-right-corner">
            <rect x="-25" y="200" width="512" height="306" strokeWidth="50" />
            <rect x="-25" y="-25" width="250" height="450" strokeWidth="50"/>
        </clipPath>
        <g transform="translate(56,56)">
            <rect x="0" y="0" width="400" height="400" fill="transparent" strokeWidth="50"  clipPath="url(#cut-off-upper-right-corner)"/>
        </g>
    </svg>

}
import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M17.714 21.428H6.286a2.857 2.857 0 0 1-2.857-2.857V7.142a2.857 2.857 0 0 1 2.857-2.857h11.428a2.857 2.857 0 0 1 2.857 2.857v11.429a2.857 2.857 0 0 1-2.857 2.857ZM7.714 2.571v3.727M16.286 2.571v3.727"
            stroke="#222324"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

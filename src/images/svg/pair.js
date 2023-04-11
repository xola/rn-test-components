import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={29}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m12.54 15.496 1.048 1.048a4.402 4.402 0 0 0 6.223 0l3.334-3.334a5.105 5.105 0 0 0-7.22-7.219l-.975.977"
            stroke="#222324"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="m16.94 12.197-1.048-1.049a4.4 4.4 0 0 0-6.223 0l-3.334 3.334a5.105 5.105 0 0 0 0 7.22v0a5.105 5.105 0 0 0 7.22 0l.975-.977"
            stroke="#222324"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

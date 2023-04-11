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
            d="M18.5 8.908c0 3.688-2.99 8.348-6.678 8.348-3.689 0-6.68-4.66-6.68-8.348v0a6.679 6.679 0 0 1 13.359 0v0Z"
            stroke="#505254"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M11.714 17.249s-.943 3.328.939 4.694"
            stroke="#505254"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

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
            d="M4.456 20.85c0-2.678 2.144-4.714 4.716-4.714h5.466c2.68 0 4.716 2.143 4.716 4.714M15.147 4.383c1.821 1.837 1.821 4.756 0 6.485-1.821 1.73-4.714 1.838-6.428 0-1.714-1.837-1.821-4.756 0-6.485a4.63 4.63 0 0 1 6.428 0Z"
            stroke="#222324"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

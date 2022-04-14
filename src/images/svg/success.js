import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={212}
        height={213}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={106} cy={106.5} r={106} fill="#E2FFEF" />
        <Path
            d="m146.463 86.25-58.142 58.142-26.428-26.428"
            stroke="#27CE70"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

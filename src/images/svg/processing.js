import * as React from "react"
import Svg, { Circle } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={212}
        height={212}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={106} cy={106} r={106} fill="#D1E1FF" />
        <Circle opacity={0.1} cx={106.5} cy={106} r={47.5} fill="#1352C6" />
    </Svg>
)

export default SvgComponent

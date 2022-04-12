import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect width={24} height={24} rx={12} fill="#27CE70" />
        <Path
            d="M16.268 9.467 10.4 15.334l-2.667-2.667"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={212}
        height={212}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={106} cy={106} r={106} fill="#D1E1FF" />
        <Path
            d="M59 97.167A23.6 23.6 0 0 1 82.475 80.5h12.5c4.05 0 8.333 2.083 8.333 6.25v2.083c0 4.167-4.166 6.25-8.333 6.25h-8.333s-4.167 14.584-12.5 14.584M109.558 143h-31.25a20.784 20.784 0 0 1-14.863-6.25M99.144 118h27.084a6.249 6.249 0 1 1 0 12.5h-16.667"
            stroke="#222324"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M99.144 130.5h10.417a6.247 6.247 0 0 1 6.25 6.25 6.248 6.248 0 0 1-6.25 6.25h-6.25M153.308 84.667h-50.433M78.31 80.825V74.25A6.25 6.25 0 0 1 84.56 68h62.501a6.25 6.25 0 0 1 6.25 6.25v37.5a6.249 6.249 0 0 1-6.25 6.25h-62.5a6.247 6.247 0 0 1-6.25-6.25v-3.383M144.977 93h-12.5"
            stroke="#222324"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

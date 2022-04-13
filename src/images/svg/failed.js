import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={212}
        height={212}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={106} cy={106} r={106} fill="#FFF0F0" />
        <G
            clipPath="url(#a)"
            stroke="#FF5A5A"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="m138.383 82.953-65.762 65.763M138.379 148.716 72.617 82.953" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" transform="translate(50 58)" d="M0 0h111v111H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default SvgComponent

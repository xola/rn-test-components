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
            d="M21.811 16.83h2.828M17.569 23.9v-2.828M22.871 22.134l-2.121-2.122M7.668 11.174H4.84M11.913 4.102V6.93M6.607 5.87 8.729 7.99M15.448 18.417l-2.346 2.346a3.561 3.561 0 0 1-5.036-5.036l2.346-2.346M14.094 9.614l2.347-2.347a3.561 3.561 0 0 1 5.036 5.036L19.13 14.65"
            stroke="#222324"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

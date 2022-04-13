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
            d="M8.132 2.658c5.159-2.137 11.073.314 13.21 5.473 2.138 5.16-.313 11.074-5.472 13.211-5.16 2.138-11.074-.313-13.211-5.472-2.137-5.16.313-11.074 5.473-13.212"
            stroke="#222324"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M11.684 7.488v5.227l4.108 2.505"
            stroke="#222324"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

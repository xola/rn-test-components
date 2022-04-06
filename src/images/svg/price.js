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
            d="M18.603 14.4H5.569a.426.426 0 0 0-.426.425v3.777c0 .235.19.426.426.426h13.034c.235 0 .426-.19.426-.426v-3.777a.426.426 0 0 0-.426-.426Z"
            stroke="#222324"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M20.146 9.771H7.113a.426.426 0 0 0-.426.426v3.777c0 .235.19.426.426.426h13.033c.235 0 .426-.19.426-.426v-3.777a.426.426 0 0 0-.426-.426ZM18.603 5.143H5.569a.426.426 0 0 0-.426.426v3.776c0 .235.19.426.426.426h13.034c.235 0 .426-.19.426-.426V5.57a.426.426 0 0 0-.426-.426Z"
            stroke="#222324"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

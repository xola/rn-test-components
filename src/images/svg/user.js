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
            d="M11.829 22.285c5.585 0 10.114-4.605 10.114-10.285 0-5.681-4.529-10.286-10.115-10.286C6.244 1.714 1.714 6.319 1.714 12c0 5.68 4.529 10.285 10.114 10.285Z"
            stroke="#505254"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M14.357 12c0-1.42-1.132-2.572-2.529-2.572C10.432 9.428 9.3 10.58 9.3 12c0 1.42 1.132 2.571 2.528 2.571 1.397 0 2.529-1.151 2.529-2.571Z"
            fill="#222324"
        />
    </Svg>
)

export default SvgComponent

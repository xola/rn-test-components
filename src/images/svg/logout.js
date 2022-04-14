import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        width={18}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M8.984 16.57a7.585 7.585 0 1 0 0-15.17 7.585 7.585 0 0 0 0 15.17ZM5.952 8.985H12.017"
            stroke="#222324"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

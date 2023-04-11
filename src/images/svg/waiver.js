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
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1.226 16.963h15.642M15.957 6.135 6.171 15.92v0a.65.65 0 0 1-.332.178l-3.729.746v0a.65.65 0 0 1-.764-.765l.745-3.728v0a.657.657 0 0 1 .178-.333l9.786-9.785v0a2.751 2.751 0 0 1 3.89 0l.012.012v0a2.753 2.753 0 0 1 0 3.89v0Z"
        />
    </Svg>
)

export default SvgComponent

import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = props => (
    <Svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
            d="M12.45 21.68a9.23 9.23 0 1 0 0-18.459 9.23 9.23 0 0 0 0 18.459ZM18.978 18.977l5.803 5.803"
            stroke="#fff"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

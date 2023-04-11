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
            d="M4.286 13.101a1.029 1.029 0 0 1 1.6-.856l5.543 3.697c.346.23.796.23 1.142 0l5.544-3.697a1.029 1.029 0 0 1 1.6.856v3.923c0 .344-.172.665-.459.856l-6.685 4.457c-.346.23-.796.23-1.142 0l-6.686-4.461a1.028 1.028 0 0 1-.457-.856v-3.919ZM12.484 2.01l1.058 2.275H15.6a.503.503 0 0 1 .354.88l-1.785 1.76.988 2.27a.539.539 0 0 1-.767.674L12 8.525 9.61 9.87a.539.539 0 0 1-.768-.673l.988-2.271-1.784-1.758a.503.503 0 0 1 .354-.882h2.057l1.058-2.276a.545.545 0 0 1 .969 0Z"
            stroke="#505254"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default SvgComponent

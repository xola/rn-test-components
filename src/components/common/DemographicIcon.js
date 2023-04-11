import React, { useState } from 'react';
import {
    AdultIcon,
    ChildIcon,
    VeteranIcon,
    UserIcon
} from '../../images/svg'
import OrderUtil from '../../utils/OrderUtil';

const DemoGraphicIcon = ({ name }) => {
    const icon = OrderUtil.guessDemographicIcon(name)
    const iconName = icon || 'children'
    const icons = {
        user: AdultIcon,
        children: ChildIcon,
        veteran: VeteranIcon,
        senior: UserIcon
    }
    const IconComponent = icons[iconName];

    return <IconComponent />
}

export default DemoGraphicIcon;

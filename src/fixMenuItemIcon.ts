import React from 'react';
import type {MenuDataItem} from '@ant-design/pro-layout';
import * as allIcons from '@ant-design/icons';

const fixMenuItemIcon = (menus: MenuDataItem[], iconType = 'Outlined'): MenuDataItem[] => {
    menus.forEach((item) => {
        const {icon, children} = item
        if (typeof icon === 'string') {
            const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType
            item.icon = React.createElement(allIcons[fixIconName] || allIcons[icon])
        }
        children && children.length > 0 ? item.children = fixMenuItemIcon(children, iconType = 'Outlined') : null
    });
    return menus
};

export default fixMenuItemIcon;

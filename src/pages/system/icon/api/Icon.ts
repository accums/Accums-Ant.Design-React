
import * as IconsReact from "@ant-design/icons";
import {createElement} from "react";

export const Icon = (props: { icon: string }) => {
    const { icon } = props;
    const antIcon: { [key: string]: any } = IconsReact;
    return createElement(antIcon[icon]);
};

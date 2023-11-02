import {Tabs} from "antd";
import React from "react";


export default (props: {activeKey:any, setKey: any, items: any }) => {
    return (
        <Tabs
            activeKey={props.activeKey}
            onChange={function (activeKey) {
                props.setKey(activeKey);
            }}
            items={props.items}/>
    );
};
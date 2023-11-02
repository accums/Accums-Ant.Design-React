import {Card, List} from "antd";
import React, {useState} from "react";
import {Icon} from "../api/Icon";


export default (props: { dataSource: any }) => {

    const [style, setStyle] = useState<any>();

    return (
        <List
            grid={{
                gutter: 8,
                xs: 5,
                sm: 8,
                md: 9,
                lg: 10,
                xl: 11,
                xxl: 12,
            }}
            dataSource={props.dataSource}
            renderItem={(item: any) => (
                <List.Item style={{width: 50}}>
                    <Card style={style}
                          onClick={(items) => {
                              setStyle({backgroundColor: 'lightblue'})
                          }}
                          bodyStyle={{textAlign: "center"}}
                          hoverable={true}
                          size={"small"}>
                        <Icon key={item.iconId} icon={item.iconName}></Icon>
                    </Card>
                </List.Item>
            )}
        />
    );
};
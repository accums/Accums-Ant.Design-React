import {Card, List} from "antd";
import React, {useState} from "react";
import {Icon} from "../api/Icon";


export default (props: { dataSource: any }) => {

  const [selectKey, setSelectKey] = useState<any>('');

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
          <Card
            onClick={(items) => {
              const currentTarget = items.currentTarget;
              if (selectKey) {
                setSelectKey(currentTarget)
              } else {
                setSelectKey('')
              }

              const backgroundColor = selectKey.style.backgroundColor;

              if (backgroundColor === "aqua") {
                currentTarget.style.backgroundColor = '';
              } else {
                currentTarget.style.backgroundColor = 'aqua';
              }
            }}
            accessKey={item.iconName}
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

import {Button, message, Space,} from 'antd';
import React, {} from "react";
import PopConfirm from "antd/es/popconfirm";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteSysUser} from "@/pages/system/user/api/UserApi";

export default (props: { actionRef: any, userId: any, setSelectedRowKeys: any }) => {

  return (
    <Space size={16}>
      <PopConfirm
        title="是否删除所选数据"
        okText="是"
        cancelText="否"
        placement='rightTop'
        onConfirm={
          async () => {
            let result = await deleteSysUser({"userId": props.userId});
            if (result.success && result.data) {
              props.setSelectedRowKeys([]);
              message.success("删除用户数据成功！");
              props.actionRef.current?.reload()
              return true;
            }
            message.error("删除用户数据失败,请重试");
            return false;
          }
        }
      >
        <Button danger size={"small"} icon={<DeleteOutlined/>}>删除</Button>
      </PopConfirm>
    </Space>
  );
};

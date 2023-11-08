import {Button, message, Space} from 'antd';
import React from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysDict} from "@/pages/system/dict/api/DictApi";
import {DeleteOutlined} from "@ant-design/icons";


const DeleteDictPopConfirm: React.FC<any> = ({actionRef, dictId}) => {
  if (dictId === null || dictId === undefined) {
    return (<></>);
  }
  return (
    <Space size={16}>
      <PopConfirm
        title="是否删除所选字典数据？"
        okText="是"
        cancelText="否"
        placement='leftTop'
        onConfirm={
          async () => {
            let res = await deleteSysDict(dictId);
            if (res.data) {
              message.success("删除成功");
              actionRef.current?.reload()
              return true;
            }
            message.error("删除失败,请重试");
            return false;
          }
        }
      >
        <Button ghost type="primary" danger icon={<DeleteOutlined/>}></Button>
      </PopConfirm>
    </Space>
  );
};
export default DeleteDictPopConfirm;

import {message, Space,} from 'antd';
import React, {} from "react";
import PopConfirm from "antd/es/popconfirm";
import {deleteSysOrganization} from "@/pages/system/organization/api/OrgApi";

export default (props: any) => {

    return (
        <Space size={16}>
            <PopConfirm
                title="是否删除所选机构数据，关联子节点将一并删除"
                okText="是"
                cancelText="否"
                placement='rightTop'
                onConfirm={
                    async () => {
                        let res = await deleteSysOrganization({orgId: props.orgId});
                        if (res.data) {
                            message.success("删除组织机构数据成功");
                            props.actionRef.current?.reload()
                            return true;
                        }
                        message.error("删除组织机构数据失败 请重试");
                        return false;
                    }
                }
            >
                {props.trigger}
            </PopConfirm>
        </Space>
    );
};

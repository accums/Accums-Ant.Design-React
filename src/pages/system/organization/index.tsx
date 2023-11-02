import {ProCard,} from '@ant-design/pro-components';
import React, {} from 'react';
import OrgProTable from './components/OrgProTable';
import {getSysOrganizationTreeList} from "@/pages/system/organization/api/OrgApi";

export default () => {
    const orgProTableData = async (params: any) => {
        const result = await getSysOrganizationTreeList(params);
        return {
            data: result.data,
            success: result.success,
        };
    }
    return (
        <ProCard key={"ProCard"} split="vertical" ghost>
            <OrgProTable dataSource={orgProTableData}/>
        </ProCard>
    );
}

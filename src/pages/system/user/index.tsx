import {PageContainer, ProCard} from '@ant-design/pro-components';
import React, {useState} from 'react';
import UserTable from './components/UserTable';
import OrgUserProTable from "@/pages/system/organization/components/OrgUserProTable";
import {getSysOrganizationTreeList} from "@/pages/system/organization/api/OrgApi";

const DictTypeAndDict: React.FC = () => {

  const [orgId, setOrgId] = useState('');
  const [hrOrgTableSelectedRowKeys, setHrOrgTableSelectedRowKeys] = useState<React.Key[]>([]);
  const orgProTableData = async (params: any) => {
    const result = await getSysOrganizationTreeList(params);
    setOrgId('0')
    //这里若不写['0'] 则除了第一次渲染后列表选择第一个 手动刷新后会消失
    setHrOrgTableSelectedRowKeys(['0']);
    result.data.unshift({
      orgName: '全部用户',
      orgId: '0'
    })
    return {
      data: result.data,
      success: result.success,
    };
  }

  return (
    <PageContainer>
      <ProCard  key={"ProCard"} split="vertical" bodyStyle={{height: "600px"}}>
        <ProCard key={"ProCard1"} colSpan={{xs: 12, sm: 5}} ghost>
          <OrgUserProTable dataSource={orgProTableData}
                           orgId={orgId}
                           setOrgId={setOrgId}
                           hrOrgIdTableSelectedRowKeys={hrOrgTableSelectedRowKeys}
                           setHrOrgTableSelectedRowKeys={setHrOrgTableSelectedRowKeys}
          />
        </ProCard>
        <ProCard key={"ProCard2"} colSpan={{xs: 12, sm: 19}} ghost>
          <UserTable orgId={orgId}/>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default DictTypeAndDict;

import {PageContainer, ProCard} from '@ant-design/pro-components';
import React, {useState} from 'react';
import DictTypeList from "@/pages/system/dict/components/table/DictTypeTable";
import DictTable from './components/table/DictTable';
import {getSysDictTypeList} from "@/pages/system/dict/api/DictTypeApi";


//字典类型表格和字典表格
const DictTypeAndDict: React.FC = () => {
    const [dictTypeId, setDictTypeId] = useState('');
    const [dictTypeTableSelectedRowKeys, setDictTypeTableSelectedRowKeys] = useState<React.Key[]>([]);


    const dictTypeListData = async (params: any) => {
        const result = await getSysDictTypeList(params);
        setDictTypeId(result.data[0].dictTypeId)
        setDictTypeTableSelectedRowKeys([result.data[0].dictTypeId])
        return {
            data: result.data,
            success: result.success,
        };
    };
    return (
        <PageContainer>
            <ProCard key={"ProCard"} split="vertical" >
                <ProCard key={"ProCard1"} colSpan={{xs: 12, sm: 12}} ghost>
                    <DictTypeList dictTypeId={dictTypeId}
                                  setDictTypeId={setDictTypeId}
                                  dataSource={dictTypeListData}
                                  dictTypeTableSelectedRowKeys={dictTypeTableSelectedRowKeys}
                                  setDictTypeTableSelectedRowKeys={setDictTypeTableSelectedRowKeys}
                    />
                </ProCard>
                <ProCard key={"ProCard2"} colSpan={{xs: 12, sm: 12}} ghost>
                    <DictTable dictTypeId={dictTypeId} />
                </ProCard>
            </ProCard>
        </PageContainer>
    );
};

export default DictTypeAndDict;

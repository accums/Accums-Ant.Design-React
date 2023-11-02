import {
    PageContainer,
    ProCard,
} from '@ant-design/pro-components';
import React from 'react';
import AlibabaCloudOssBucketTable from "@/pages/system/file/alibaba/oss/bucket/AlibabaCloudOssBucketTable";
import AlibabaCloudFileUpload from "@/pages/system/file/alibaba/oss/files/AlibabaCloudFileUpload";
import AlibabaCloudOssFilesTable from './files/AlibabaCloudOssFilesTable';

export default () => {

    return (
        <PageContainer >

            <ProCard layout={"center"} bordered={true} tabs={{type: 'card',}}>

                <ProCard.TabPane key="AlibabaCloudOssBucketTable" tab="存储空间">
                    <ProCard>
                        <AlibabaCloudOssBucketTable/>
                    </ProCard>
                </ProCard.TabPane>

                <ProCard.TabPane key="AlibabaCloudFileUpload" tab="上传文件">

                    <ProCard layout={"center"} bordered={false} tabs={{type: 'line',}}>

                        <ProCard.TabPane key="AlibabaCloudFileUpload_simple" tab="简单上传">
                            <ProCard>
                                <AlibabaCloudFileUpload/>
                            </ProCard>
                        </ProCard.TabPane>
                    </ProCard>

                </ProCard.TabPane>

                <ProCard.TabPane key="AlibabaCloudOssFilesTable" tab="文件列表">
                    <ProCard>
                        <AlibabaCloudOssFilesTable/>
                    </ProCard>
                </ProCard.TabPane>

            </ProCard>
        </PageContainer>
    );
};
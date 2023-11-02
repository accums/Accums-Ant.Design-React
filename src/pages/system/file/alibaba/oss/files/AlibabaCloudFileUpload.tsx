import {
    ProForm, ProFormSelect,
} from '@ant-design/pro-components';
import React, {useState} from 'react';
import {Alert, Button, Upload, UploadProps} from "antd";
import {listBuckets} from "@/pages/system/file/alibaba/oss/bucket/api/BucketApi";
import {UploadOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es";

export default () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    return (
        <>
            <Alert
                message={
                    <div>
                        <h4>1. 文件大小限制：文件大小不能超过5个G。超过5 GB的文件上传请使用分片上传</h4>
                        <h4>2. 文件命名规则：使用UTF-8编码。 长度必须在1~1023字符之间。 不能以正斜线（/）或者反斜线（\）字符开头。</h4>
                        <h4>3. 同名文件覆盖：同一天上传 名称相同 且 路径相同的文件 将会被覆盖</h4>
                    </div>
                }
            />
            <p></p>
            <ProForm
                layout={"vertical"}
                submitter={false}
            >
                <ProFormSelect
                    width={"md"}
                    label="存储空间"
                    name={'type'}
                    rules={[{required: true}]}
                    fieldProps={{
                        fieldNames:{
                            label: "name",
                            value: "name"
                        }
                    }}
                    request={async ()=>{
                        const result = await listBuckets({})
                        return result.data
                    }}
                />
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
                <Button
                    type="primary"
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? '上传中' : '开始上传'}
                </Button>
            </ProForm>
        </>
    );
};
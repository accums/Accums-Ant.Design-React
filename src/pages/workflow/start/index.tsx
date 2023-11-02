import type {ActionType} from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {selectModelListPage} from "@/pages/model/api/modelApi";
import AddModel from "@/pages/model/components/AddModelModalForm";
import {Tag} from "antd";
import DesignModelModelForm from "@/pages/model/components/DesignModelModelForm";
import UpdateModelModalForm from "@/pages/model/components/UpdateModelModalForm";
import DeleteModelPopConFirm from "@/pages/model/components/DeleteModelPopconfirm";
import DeleteWholeModelPopconfirm from "@/pages/model/components/DeleteWholeModelPopconfirm";
import DeployModelModalFormTable from "@/pages/deploy/components/DeployModelModalFormTable";

export default () => {

  const actionRef = useRef<ActionType>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  return (
    <PageContainer>

    </PageContainer>
  );
};

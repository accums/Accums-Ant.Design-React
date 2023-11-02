import {PageContainer, ProCard} from '@ant-design/pro-components';
import ModelDeployProForm from "@/pages/workflow/deploy/components/ModelDeployProForm";

export default () => (
  <PageContainer>
    <ProCard tabs={{type: 'card'}}>
      <ProCard.TabPane key="ModelDeployProForm" tab="通过模型部署">
        <ModelDeployProForm/>
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="通过文件部署">
      </ProCard.TabPane>
      <ProCard.TabPane key="tab3" tab="通过压缩包部署">
      </ProCard.TabPane>
      <ProCard.TabPane key="tab4" tab="通过字符串部署">
      </ProCard.TabPane>
    </ProCard>
  </PageContainer>
);

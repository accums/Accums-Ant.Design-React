import {ModalForm,} from '@ant-design/pro-components';
import {Button,} from 'antd';
import React, {useEffect, useState} from "react";
import {PictureOutlined} from "@ant-design/icons";
import {getActReDefineImage} from "@/pages/workflow/define/api/defineApi";
import Viewer from "bpmn-js/lib/NavigatedViewer";
import TokenSimulationModule from 'bpmn-js-token-simulation/lib/viewer';

function DefinePictureModalForm(props: { actionRef: any, selectedRowKeys: any }) {
  let viewer: Viewer | null = null;
  const [bpmnXml, setBpmnXml] = useState<any>('');
  const [dateTime, setDateTime] = useState<any>('');

  useEffect(() => {
    if (bpmnXml) {
      viewer = new Viewer({
        // @ts-ignore
        container: document.getElementById('canvas'),
        additionalModules: [
          TokenSimulationModule
        ],
        height: '60vh'
      });
      viewer.importXML(bpmnXml).then();
    }
  }, [dateTime])


  return (
    <ModalForm
      modalProps={{destroyOnClose: true}}
      submitter={false}
      trigger={<Button style={{marginRight: '10px'}} size={"small"} type="primary" ghost
                       icon={<PictureOutlined/>}> 流程图 </Button>}
      request={async () => {
        const newVar = await getActReDefineImage({defineId: props.selectedRowKeys});
        setBpmnXml(newVar);
        setDateTime(new Date().getTime())
        return true
      }}>
      <div id="canvas"></div>
    </ModalForm>
  );
}

export default DefinePictureModalForm;

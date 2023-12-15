import {AntDesignOutlined, SendOutlined} from '@ant-design/icons';
import {ModalForm} from '@ant-design/pro-components';
import {Button} from 'antd';
import React, {useEffect, useState} from "react";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';

import Modeler from "bpmn-js/lib/Modeler";
import {getEditorXml} from "@/pages/workflow/model/api/modelApi";
import {chineseTranslate} from '../edit/ChineseTranslate';
import ToolBar from "@/pages/workflow/model/edit/ToolBar";

export default (props: { modelId: any }) => {

  let modeler = null;

  const [bpmnXml, setBpmnXml] = useState<any>('');
  const [dateTime, setDateTime] = useState<any>('');

  useEffect(() => {
    modeler = new Modeler({
      height: '77vh',
      // @ts-ignore
      container: document.getElementById('canvas'),
      additionalModules: [
        chineseTranslate,
      ],
    })

    if (bpmnXml) {
      modeler.importXML(bpmnXml).then();
    } else {
      modeler.createDiagram().then();
    }
  }, [dateTime])

  return (
    <ModalForm
      width='100'
      submitter={false}
      trigger={<Button style={{marginRight: '10px'}} size={"small"} type="primary" ghost
                       icon={<AntDesignOutlined/>}> 设计流程(新) </Button>}
      request={async () => {
        const newVar = await getEditorXml({modelId: props.modelId});
        setBpmnXml(newVar)
        setDateTime(new Date().getTime())
        return true
      }}
      modalProps={{destroyOnClose: true, maskClosable: false, closeIcon: <SendOutlined/>}}
    >
      <ToolBar modeler={modeler}/>
      <div id="canvas"></div>
    </ModalForm>
  );
};

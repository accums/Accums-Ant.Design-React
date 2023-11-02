import React from 'react';
import {Descriptions} from 'antd';
import {ModalForm} from "@ant-design/pro-components";

export default (props: { entity: any }) => {

    const state = new Map([
        ["AUDIT_STATE_INIT", "审核中"],
        ["AUDIT_STATE_PASS", '审核通过'],
        ["AUDIT_STATE_NOT_PASS", "审核未通过"],
        ['AUDIT_STATE_CANCEL', '取消审核'],
        ['AUDIT_SATE_CANCEL', '取消审核']
    ]);

    return (
        <ModalForm
            trigger={<a>{state.get(props.entity.auditStatus)}</a>} submitter={false}
        >
            <Descriptions
                bordered
                title={'短信模板名称：【'+props.entity.templateName+"】 - 审核未通过"}
                column={1}
            >
                <Descriptions.Item span={1} label={"时间"}>{props.entity.reason.rejectDate}</Descriptions.Item>
                <Descriptions.Item span={1} label={"原因"}>{props.entity.reason.rejectInfo}</Descriptions.Item>
                <Descriptions.Item span={1} label={"备注"}>{props.entity.reason.rejectSubInfo}</Descriptions.Item>
            </Descriptions>
        </ModalForm>
    )
}

import {Button, TabsProps} from 'antd';
import React, {useEffect, useState} from 'react';
import {getAntDesignIconList} from "@/pages/system/icon/api/IconApi";
import IconList from './IconList';
import IconTabs from './IconTabs';
import {ModalForm} from "@ant-design/pro-components";


export default () => {

    const [dataSource, setDataSource] = useState<any>([]);


    const itemsInner: TabsProps['items'] = [
        {
            key: 'direction',
            label: `方向性图标`,
            children: <IconList dataSource={dataSource}/>
        },
        {
            key: 'propose',
            label: `建议性图标`,
            children: <IconList dataSource={dataSource}/>
        },
        {
            key: 'edit',
            label: `编辑类图标`,
            children: <IconList dataSource={dataSource}/>
        },
        {
            key: 'data',
            label: `数据类图标`,
            children: <IconList dataSource={dataSource}/>
        },
        {
            key: 'brand',
            label: `品牌性图标`,
            children: <IconList dataSource={dataSource}/>
        },
        {
            key: 'currency',
            label: `通用性图标`,
            children: <IconList dataSource={dataSource}/>
        },
    ];

    const [ke2, setKey2] = useState<any>(itemsInner[0].key);


    const itemsOuter: TabsProps['items'] = [
        {
            key: 'Outlined',
            label: `线框风格`,
            children: <IconTabs activeKey={ke2} items={itemsInner} setKey={setKey2}/>
        },
        {
            key: 'Filled',
            label: `实低风格`,
            children: <IconTabs activeKey={ke2} items={itemsInner} setKey={setKey2}/>
        },
        {
            key: 'TwoTone',
            label: `双色风格`,
            children: <IconTabs activeKey={ke2} items={itemsInner} setKey={setKey2}/>
        },
    ];


    const [ke1, setKey1] = useState<any>(itemsOuter[0].key);

    const dictTypeListData = async (params: any) => {
        const result = await getAntDesignIconList(params);
        setDataSource(result.data)
        return {
            data: result.data,
            success: result.success,
        };
    };

    useEffect(() => {
        dictTypeListData({
            iconLargeCategory: ke1,
            iconSubclass: ke2,
        }).then()
    }, [ke1, ke2]);

    return (
        <ModalForm trigger={<Button type="primary">图标选择</Button>}>
            <IconTabs activeKey={ke1} items={itemsOuter} setKey={setKey1}/>
        </ModalForm>
    );
};

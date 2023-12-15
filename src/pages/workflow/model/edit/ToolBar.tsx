import {
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileImageOutlined,
  ImportOutlined,
  SaveOutlined,
  SwapOutlined,
  VerticalAlignMiddleOutlined
} from "@ant-design/icons";
import {Button, Space, Tooltip} from "antd";
import React from "react";

export default (props: { modeler: any }) => {
  return (
    <div style={{paddingLeft: '25px', paddingBottom: '10px'}}>
      <Space size={[8, 16]} wrap>

        <Space.Compact>
          <Tooltip title="向左对齐">
            <Button icon={<CaretLeftOutlined/>}/>
          </Tooltip>

          <Tooltip title="左右居中">
            <Button icon={<SwapOutlined/>}/>
          </Tooltip>

          <Tooltip title="向右对齐">
            <Button icon={<CaretRightOutlined/>}/>
          </Tooltip>
        </Space.Compact>

        <Space.Compact>
          <Tooltip title="向上对齐">
            <Button icon={<CaretUpOutlined/>}/>
          </Tooltip>

          <Tooltip title="上下居中">
            <Button icon={<VerticalAlignMiddleOutlined/>}/>
          </Tooltip>

          <Tooltip title="向下对齐">
            <Button icon={<CaretDownOutlined/>}/>
          </Tooltip>
        </Space.Compact>

        <Space.Compact>
          <Tooltip title="下载PBMN 2.0文件">
            <Button icon={<DownloadOutlined/>}/>
          </Tooltip>

          <Tooltip title="下载SVG图片">
            <Button icon={<FileImageOutlined/>}/>
          </Tooltip>

          <Tooltip title="导入PBMN 2.0文件">
            <Button icon={<ImportOutlined/>}/>
          </Tooltip>
        </Space.Compact>

        <Tooltip title="清空">
          <Button icon={<DeleteOutlined/>}/>
        </Tooltip>

        <Tooltip title="保存">
          <Button icon={<SaveOutlined/>}/>
        </Tooltip>

      </Space>
    </div>
  );
}


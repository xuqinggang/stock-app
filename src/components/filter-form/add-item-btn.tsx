import { memo, ReactNode } from "react";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface AddItemBtnProps {
  btnNode?: ReactNode;
  disabled?: boolean;
  className?: string;
  onItemAdd?: () => void;
}

export const AddItemBtn = memo((props: AddItemBtnProps) => {
  const { onItemAdd, btnNode = "添加", disabled, className } = props;

  return (
    <Button
      style={{ width: "fit-content", height: 32 }}
      className={className}
      icon={<PlusOutlined />}
      type="link"
      disabled={disabled}
      onClick={() => onItemAdd?.()}
    >
      {btnNode}
    </Button>
  );
});

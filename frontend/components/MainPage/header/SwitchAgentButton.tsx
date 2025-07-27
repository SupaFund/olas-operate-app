import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { Pages } from '@/enums/Pages';
import { usePageState } from '@/hooks/usePageState';

export const SwitchAgentButton = () => {
  const { goto } = usePageState();

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={() => goto(Pages.SwitchAgent)}
      size="small"
    >
      Switch Agent
    </Button>
  );
};
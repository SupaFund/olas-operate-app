import { DashboardOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';

import { AgentType } from '@/enums/Agent';
import { Pages } from '@/enums/Pages';
import { usePageState } from '@/hooks/usePageState';
import { useServices } from '@/hooks/useServices';

const { Text } = Typography;

export const SupafundDashboardButton = () => {
  const { goto } = usePageState();
  const { selectedAgentType } = useServices();

  const isSupafundAgent = selectedAgentType === AgentType.Supafund;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goto(Pages.SupafundDashboard);
  };

  if (!isSupafundAgent) {
    return null;
  }

  return (
    <Tooltip
      arrow={false}
      title={<Text className="text-sm">View Supafund Dashboard</Text>}
      overlayInnerStyle={{ width: 'max-content' }}
      placement="bottomLeft"
    >
      <Button
        type="default"
        size="large"
        onClick={handleClick}
        icon={<DashboardOutlined />}
      />
    </Tooltip>
  );
};

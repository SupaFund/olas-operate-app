import { ControlOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

interface DashboardHeaderProps {
  agentName: string;
  onConfigClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  agentName,
  onConfigClick,
}) => {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {agentName} Dashboard
          </Title>
          <Text type="secondary">
            Monitor your agent&apos;s performance and trading activities
          </Text>
        </div>
        <Space>
          <Button 
            icon={<ControlOutlined />} 
            onClick={onConfigClick}
            title="Configuration"
          />
        </Space>
      </div>
    </Card>
  );
};

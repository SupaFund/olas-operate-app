import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Empty, List, Tag, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface Activity {
  id: string;
  type: 'POSITION_OPENED' | 'POSITION_CLOSED' | 'MARKET_ANALYSIS';
  title: string;
  description: string;
  timestamp: string;
  result?: {
    pnl?: number;
    confidence?: string;
  };
}

interface ActivityTabProps {
  activities: Activity[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'POSITION_OPENED':
      return <SwapOutlined style={{ color: '#1890ff' }} />;
    case 'POSITION_CLOSED':
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'MARKET_ANALYSIS':
      return <CloseCircleOutlined style={{ color: '#faad14' }} />;
    default:
      return null;
  }
};

const getActivityTypeTag = (type: string) => {
  switch (type) {
    case 'POSITION_OPENED':
      return <Tag color="blue">Position Opened</Tag>;
    case 'POSITION_CLOSED':
      return <Tag color="green">Position Closed</Tag>;
    case 'MARKET_ANALYSIS':
      return <Tag color="orange">Market Analysis</Tag>;
    default:
      return null;
  }
};

export const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <Empty description="No recent activity" style={{ padding: '40px 0' }} />
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={activities}
      pagination={{ pageSize: 10 }}
      renderItem={(activity) => (
        <List.Item>
          <List.Item.Meta
            avatar={getActivityIcon(activity.type)}
            title={
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Text>{activity.title}</Text>
                {getActivityTypeTag(activity.type)}
              </div>
            }
            description={
              <div>
                <Text type="secondary">{activity.description}</Text>
                {activity.result?.pnl !== undefined && (
                  <div style={{ marginTop: '4px' }}>
                    <Text
                      style={{
                        color: activity.result.pnl >= 0 ? '#3f8600' : '#cf1322',
                      }}
                    >
                      P&L: {activity.result.pnl >= 0 ? '+' : ''}$
                      {activity.result.pnl.toFixed(2)}
                    </Text>
                  </div>
                )}
                {activity.result?.confidence && (
                  <div style={{ marginTop: '4px' }}>
                    <Text type="secondary">
                      Confidence: {activity.result.confidence}
                    </Text>
                  </div>
                )}
              </div>
            }
          />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {activity.timestamp}
          </Text>
        </List.Item>
      )}
    />
  );
};

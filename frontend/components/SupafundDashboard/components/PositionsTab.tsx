import { Button, Card, Empty, Space, Tag, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface Position {
  id: string;
  market: string;
  direction: 'YES' | 'NO';
  entryPrice: number;
  currentPrice: number;
  size: number;
  pnl: number;
  pnlPercentage: number;
  timeRemaining: string;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
}

interface PositionsTabProps {
  positions: Position[];
}

export const PositionsTab: React.FC<PositionsTabProps> = ({ positions }) => {
  if (positions.length === 0) {
    return (
      <Empty description="No active positions" style={{ padding: '40px 0' }} />
    );
  }

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {positions.map((position) => {
        const pnlColor = position.pnl >= 0 ? '#3f8600' : '#cf1322';
        const pnlPrefix = position.pnl >= 0 ? '+' : '';
        
        return (
          <Card key={position.id} size="small" style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Market title with direction tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text strong style={{ fontSize: '14px', flex: 1, marginRight: '8px' }}>
                  {position.market}
                </Text>
                <Tag color={position.direction === 'YES' ? 'green' : 'red'} style={{ margin: 0 }}>
                  {position.direction}
                </Tag>
              </div>
              
              {/* Price info */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Entry: </Text>
                  <Text style={{ fontSize: '12px' }}>${position.entryPrice.toFixed(2)}</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Current: </Text>
                  <Text style={{ fontSize: '12px' }}>${position.currentPrice.toFixed(2)}</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Size: </Text>
                  <Text style={{ fontSize: '12px' }}>${position.size.toFixed(2)}</Text>
                </div>
              </div>
              
              {/* P&L and time remaining */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text style={{ color: pnlColor, fontSize: '13px', fontWeight: 'bold' }}>
                    {pnlPrefix}${position.pnl.toFixed(2)} ({pnlPrefix}{position.pnlPercentage.toFixed(1)}%)
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    {position.timeRemaining}
                  </Text>
                  <Button type="link" size="small" style={{ padding: '0 4px', fontSize: '11px' }}>
                    View
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </Space>
  );
};

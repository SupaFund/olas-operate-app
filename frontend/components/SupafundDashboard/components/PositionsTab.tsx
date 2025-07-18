import { Button, Empty, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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
  const columns: ColumnsType<Position> = [
    {
      title: 'Market',
      dataIndex: 'market',
      key: 'market',
      ellipsis: true,
      width: '30%',
    },
    {
      title: 'Direction',
      dataIndex: 'direction',
      key: 'direction',
      render: (direction: string) => (
        <Tag color={direction === 'YES' ? 'green' : 'red'}>{direction}</Tag>
      ),
    },
    {
      title: 'Entry / Current',
      key: 'prices',
      render: (_, record) => (
        <div>
          <Text>${record.entryPrice.toFixed(2)}</Text>
          <br />
          <Text type="secondary">${record.currentPrice.toFixed(2)}</Text>
        </div>
      ),
    },
    {
      title: 'P&L',
      key: 'pnl',
      render: (_, record) => {
        const color = record.pnl >= 0 ? '#3f8600' : '#cf1322';
        const prefix = record.pnl >= 0 ? '+' : '';
        return (
          <div>
            <Text style={{ color }}>
              {prefix}${record.pnl.toFixed(2)}
            </Text>
            <br />
            <Text style={{ color, fontSize: '12px' }}>
              {prefix}
              {record.pnlPercentage.toFixed(2)}%
            </Text>
          </div>
        );
      },
    },
    {
      title: 'Time Remaining',
      dataIndex: 'timeRemaining',
      key: 'timeRemaining',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="link" size="small">
          View Analysis
        </Button>
      ),
    },
  ];

  if (positions.length === 0) {
    return (
      <Empty description="No active positions" style={{ padding: '40px 0' }} />
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={positions}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

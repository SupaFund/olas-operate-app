import { Card, Col, Row, Statistic, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface Metrics {
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  activePositions: number;
  winRate: number;
  weeklyPerformance: number;
  monthlyPerformance: number;
}

interface MetricsSectionProps {
  metrics: Metrics;
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  const profitLossColor = metrics.totalProfitLoss >= 0 ? '#3f8600' : '#cf1322';

  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            title="Total Profit/Loss"
            value={metrics.totalProfitLoss}
            precision={2}
            valueStyle={{ color: profitLossColor }}
            prefix="$"
            suffix={
              <span style={{ fontSize: '14px', marginLeft: '8px' }}>
                ({metrics.totalProfitLossPercentage.toFixed(2)}%)
              </span>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            title="Active Positions"
            value={metrics.activePositions}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            title="Win Rate"
            value={metrics.winRate}
            precision={1}
            suffix="%"
            valueStyle={{
              color: metrics.winRate >= 50 ? '#3f8600' : '#cf1322',
            }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <div>
            <Text type="secondary">Weekly</Text>
            <Statistic
              value={metrics.weeklyPerformance}
              precision={2}
              valueStyle={{
                color: metrics.weeklyPerformance >= 0 ? '#3f8600' : '#cf1322',
                fontSize: '20px',
              }}
              prefix={metrics.weeklyPerformance >= 0 ? '+' : ''}
              suffix="%"
            />
          </div>
          <div style={{ marginTop: '8px' }}>
            <Text type="secondary">Monthly</Text>
            <Statistic
              value={metrics.monthlyPerformance}
              precision={2}
              valueStyle={{
                color: metrics.monthlyPerformance >= 0 ? '#3f8600' : '#cf1322',
                fontSize: '20px',
              }}
              prefix={metrics.monthlyPerformance >= 0 ? '+' : ''}
              suffix="%"
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

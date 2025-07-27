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
    <Row gutter={[8, 8]}>
      {/* Top row - Main P&L metric */}
      <Col xs={24}>
        <Card size="small">
          <Statistic
            title="Total Profit/Loss"
            value={metrics.totalProfitLoss}
            precision={2}
            valueStyle={{ color: profitLossColor, fontSize: '24px' }}
            prefix="$"
            suffix={
              <span style={{ fontSize: '14px', marginLeft: '8px', color: profitLossColor }}>
                ({metrics.totalProfitLossPercentage.toFixed(1)}%)
              </span>
            }
          />
        </Card>
      </Col>
      
      {/* Second row - Two key metrics */}
      <Col xs={12}>
        <Card size="small">
          <Statistic
            title="Active Positions"
            value={metrics.activePositions}
            valueStyle={{ color: '#1890ff', fontSize: '20px' }}
          />
        </Card>
      </Col>
      <Col xs={12}>
        <Card size="small">
          <Statistic
            title="Win Rate"
            value={metrics.winRate}
            precision={1}
            suffix="%"
            valueStyle={{
              color: metrics.winRate >= 50 ? '#3f8600' : '#cf1322',
              fontSize: '20px'
            }}
          />
        </Card>
      </Col>
      
      {/* Third row - Performance metrics */}
      <Col xs={12}>
        <Card size="small">
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Weekly</Text>
            <Text 
              style={{
                color: metrics.weeklyPerformance >= 0 ? '#3f8600' : '#cf1322',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              {metrics.weeklyPerformance >= 0 ? '+' : ''}{metrics.weeklyPerformance.toFixed(1)}%
            </Text>
          </div>
        </Card>
      </Col>
      <Col xs={12}>
        <Card size="small">
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Monthly</Text>
            <Text 
              style={{
                color: metrics.monthlyPerformance >= 0 ? '#3f8600' : '#cf1322',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              {metrics.monthlyPerformance >= 0 ? '+' : ''}{metrics.monthlyPerformance.toFixed(1)}%
            </Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

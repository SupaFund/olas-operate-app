import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Spin, Tabs, Typography } from 'antd';
import { useMemo } from 'react';

import { GoToMainPageButton } from '@/components/Pages/GoToMainPageButton';
import { CardFlex } from '@/components/styled/CardFlex';
import { AgentType } from '@/enums/Agent';
import { Pages } from '@/enums/Pages';
import { usePageState } from '@/hooks/usePageState';
import { useServices } from '@/hooks/useServices';

import { ActivityTab } from './components/ActivityTab';
import { DashboardHeader } from './components/DashboardHeader';
import { MetricsSection } from './components/MetricsSection';
import { OpportunitiesTab } from './components/OpportunitiesTab';
import { PositionsTab } from './components/PositionsTab';
import { useSupafundData } from './hooks/useSupafundData';

const { Title } = Typography;
const { TabPane } = Tabs;

interface SupafundDashboardProps {
  hideBackButton?: boolean;
}

export const SupafundDashboard = ({ hideBackButton = false }: SupafundDashboardProps) => {
  const { goto } = usePageState();
  const { selectedAgentConfig, selectedAgentType } = useServices();
  const { metrics, opportunities, positions, activities, isLoading } =
    useSupafundData();

  const isSupafundAgent = useMemo(
    () => selectedAgentType === AgentType.Supafund,
    [selectedAgentType],
  );

  if (!isSupafundAgent) {
    return (
      <CardFlex $noBorder $padding="16px">
        <Card>
          <Title level={4}>Supafund Dashboard</Title>
          <Typography.Text type="secondary">
            This dashboard is only available for Supafund agents.
          </Typography.Text>
          <div style={{ marginTop: '20px' }}>
            <GoToMainPageButton />
          </div>
        </Card>
      </CardFlex>
    );
  }

  return (
    <CardFlex $noBorder $padding="16px">
      {!hideBackButton && (
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={24}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => goto(Pages.SwitchAgent)}
              style={{ marginBottom: '16px' }}
            >
              Switch Agent
            </Button>
          </Col>
        </Row>
      )}

      <DashboardHeader
        agentName={selectedAgentConfig.displayName}
        onConfigClick={() => goto(Pages.SupafundConfiguration)}
      />

      <Spin spinning={isLoading}>
        <MetricsSection metrics={metrics} />

        <Card style={{ marginTop: '16px' }}>
          <Tabs defaultActiveKey="opportunities" size="large">
            <TabPane tab="Opportunities" key="opportunities">
              <OpportunitiesTab opportunities={opportunities} />
            </TabPane>
            <TabPane tab="Positions" key="positions">
              <PositionsTab positions={positions} />
            </TabPane>
            <TabPane tab="Activity" key="activity">
              <ActivityTab activities={activities} />
            </TabPane>
          </Tabs>
        </Card>
      </Spin>
    </CardFlex>
  );
};

import { Card, Flex } from 'antd';
import { useMemo } from 'react';

import { SupafundDashboard } from '@/components/SupafundDashboard';
import { AgentType } from '@/enums/Agent';
import { useServices } from '@/hooks/useServices';

import { MainHeader } from './header';
import { KeepAgentRunningSection } from './sections/KeepAgentRunningSection';

/**
 * Supafund-specific main page that shows the dashboard as primary content
 * with the start agent button preserved for easy access
 */
export const SupafundMain = () => {
  const { selectedAgentType } = useServices();
  
  const isSupafundAgent = useMemo(
    () => selectedAgentType === AgentType.Supafund,
    [selectedAgentType],
  );

  if (!isSupafundAgent) {
    return null;
  }

  return (
    <Card
      styles={{ body: { paddingTop: 0, paddingBottom: 0 } }}
      style={{ borderTopColor: 'transparent' }}
    >
      <Flex vertical>
        {/* Keep the header with start agent functionality */}
        <MainHeader />
        
        {/* Keep agent running section for easy start/stop */}
        <KeepAgentRunningSection />
        
        {/* Show Supafund Dashboard as main content */}
        <div style={{ marginTop: '16px' }}>
          <SupafundDashboard hideBackButton />
        </div>
      </Flex>
    </Card>
  );
};
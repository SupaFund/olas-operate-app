import { useMemo } from 'react';

import { SupafundDashboard } from '@/components/SupafundDashboard';
import { CardFlex } from '@/components/styled/CardFlex';
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
    <CardFlex $padding="12px">
      {/* Keep the header with start agent functionality */}
      <MainHeader />
      
      {/* Keep agent running section for easy start/stop */}
      <KeepAgentRunningSection />
      
      {/* Show Supafund Dashboard as main content */}
      <SupafundDashboard hideBackButton />
    </CardFlex>
  );
};
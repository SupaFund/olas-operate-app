import { Card, Flex } from 'antd';
import { useMemo } from 'react';

import { AgentType } from '@/enums/Agent';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { useServices } from '@/hooks/useServices';

import { MainHeader } from './header';
import { AddFundsSection } from './sections/AddFundsSection';
import { AlertSections } from './sections/AlertSections';
import { GasBalanceSection } from './sections/GasBalanceSection';
import { KeepAgentRunningSection } from './sections/KeepAgentRunningSection';
import { MainOlasBalance } from './sections/OlasBalanceSection';
import { RewardsSection } from './sections/RewardsSection';
import { StakingContractSection } from './sections/StakingContractUpdate';
import { SwitchAgentSection } from './sections/SwitchAgentSection';
import { SupafundMain } from './SupafundMain';

export const Main = () => {
  const { selectedAgentType } = useServices();
  const isStakingContractSectionEnabled = useFeatureFlag(
    'staking-contract-section',
  );

  const isSupafundAgent = useMemo(
    () => selectedAgentType === AgentType.Supafund,
    [selectedAgentType],
  );

  // For Supafund agents, show the specialized dashboard layout
  if (isSupafundAgent) {
    return <SupafundMain />;
  }

  // For other agents, show the original main page layout
  return (
    <Card
      styles={{ body: { paddingTop: 0, paddingBottom: 0 } }}
      style={{ borderTopColor: 'transparent' }}
    >
      <Flex vertical>
        <SwitchAgentSection />
        <MainHeader />
        <AlertSections />
        <MainOlasBalance />
        <RewardsSection />
        <KeepAgentRunningSection />
        {isStakingContractSectionEnabled && <StakingContractSection />}
        <GasBalanceSection />
        <AddFundsSection />
      </Flex>
    </Card>
  );
};

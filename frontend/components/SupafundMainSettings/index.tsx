import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { CardFlex } from '@/components/styled/CardFlex';
import { Pages } from '@/enums/Pages';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { usePageState } from '@/hooks/usePageState';
import { useNeedsFunds } from '@/hooks/useNeedsFunds';
import { useStakingProgram } from '@/hooks/useStakingProgram';
import { useSetup } from '@/hooks/useSetup';
import { SetupScreen } from '@/enums/SetupScreen';

import { AddFundsSection } from '../MainPage/sections/AddFundsSection';
import { AlertSections } from '../MainPage/sections/AlertSections';
import { GasBalanceSection } from '../MainPage/sections/GasBalanceSection';
import { MainOlasBalance } from '../MainPage/sections/OlasBalanceSection';
import { RewardsSection } from '../MainPage/sections/RewardsSection';
import { StakingContractSection } from '../MainPage/sections/StakingContractUpdate';

const { Title } = Typography;

/**
 * Supafund agent settings page - contains all the original main page content
 * like balances, rewards, gas, and funding sections
 */
export const SupafundMainSettings = () => {
  const { goto } = usePageState();
  const { goto: gotoSetup } = useSetup();
  const isStakingContractSectionEnabled = useFeatureFlag(
    'staking-contract-section',
  );

  // Determine if funding requirements are satisfied (Safe operating xDAI + staking OLAS)
  const { selectedStakingProgramId } = useStakingProgram();
  const {
    hasEnoughNativeTokenForInitialFunding,
    hasEnoughOlasForInitialFunding,
  } = useNeedsFunds(selectedStakingProgramId);

  const bothSatisfied = useMemo(
    () =>
      hasEnoughNativeTokenForInitialFunding === true &&
      hasEnoughOlasForInitialFunding === true,
    [hasEnoughNativeTokenForInitialFunding, hasEnoughOlasForInitialFunding],
  );

  // Only auto-return to Main when user enters this page unfunded and becomes funded here
  const [enteredUnfunded] = useState<boolean>(() => !bothSatisfied);
  useEffect(() => {
    if (enteredUnfunded && bothSatisfied) {
      // After funding is done, move to SetupYourAgent (post-funding configuration)
      gotoSetup(SetupScreen.SetupYourAgent);
    }
  }, [bothSatisfied, enteredUnfunded, gotoSetup]);

  return (
    <CardFlex>
      {/* Header with back button */}
      <Card style={{ marginBottom: '16px' }}>
        <Flex align="center" gap={12}>
          {bothSatisfied ? (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => goto(Pages.Main)}
              type="text"
            />
          ) : null}
          <Title level={4} style={{ margin: 0 }}>
            Supafund Agent Settings
          </Title>
        </Flex>
      </Card>

      {/* Original main page content as settings */}
      <Card
        styles={{ body: { paddingTop: 0, paddingBottom: 0 } }}
        style={{ borderTopColor: 'transparent' }}
      >
        <Flex vertical>
          <AlertSections />
          <MainOlasBalance />
          <RewardsSection />
          {isStakingContractSectionEnabled && <StakingContractSection />}
          <GasBalanceSection />
          <AddFundsSection />
        </Flex>
      </Card>
    </CardFlex>
  );
};

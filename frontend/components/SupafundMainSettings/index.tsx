import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';

import { CardFlex } from '@/components/styled/CardFlex';
import { Pages } from '@/enums/Pages';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { usePageState } from '@/hooks/usePageState';

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
  const isStakingContractSectionEnabled = useFeatureFlag(
    'staking-contract-section',
  );

  return (
    <CardFlex>
      {/* Header with back button */}
      <Card style={{ marginBottom: '16px' }}>
        <Flex align="center" gap={12}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => goto(Pages.Main)}
            type="text"
          />
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
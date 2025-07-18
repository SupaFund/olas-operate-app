import { Badge } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MiddlewareDeploymentStatus } from '@/client';
import { useRewardContext } from '@/hooks/useRewardContext';
import { useServices } from '@/hooks/useServices';

const badgeOffset: [number, number] = [-5, 32.5];

const AnimationContainer = styled.div`
  position: relative;
  top: -4px;
  width: 42px;
  height: 42px;
  padding: 2px 0;
  > div {
    width: 100%;
    height: 100%;
  }
`;

const TransitionalAgentHead = () => (
  <Badge status="processing" color="orange" dot offset={badgeOffset}>
    <Image src="/happy-robot.svg" alt="Happy Robot" width={40} height={40} />
  </Badge>
);

const DeployedAgentHead = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [lottieView, setLottieView] = useState<React.ReactNode>(null);
  
  useEffect(() => {
    setIsMounted(true);
    // Only import and use lottie on client side
    import('lottie-react').then(({ useLottie }) => {
      const animationData = require('../../ui/animations/robot-running.json');
      // This is a hack but necessary for client-side only rendering
      const LottieComponent = () => {
        const { View } = useLottie({
          animationData,
          loop: true,
          autoplay: true,
        });
        return View;
      };
      setLottieView(<LottieComponent />);
    });
  }, []);

  if (!isMounted || !lottieView) {
    return (
      <AnimationContainer>
        <Image src="/happy-robot.svg" alt="Happy Robot" width={40} height={40} />
      </AnimationContainer>
    );
  }

  return <AnimationContainer>{lottieView}</AnimationContainer>;
};

const StoppedAgentHead = () => (
  <Badge dot color="red" offset={badgeOffset}>
    <Image src="/sad-robot.svg" alt="Sad Robot" width={40} height={40} />
  </Badge>
);

const IdleAgentHead = () => (
  <Badge dot status="processing" color="green" offset={badgeOffset}>
    <Image src="/idle-robot.svg" alt="Idle Robot" width={40} height={40} />
  </Badge>
);

export const AgentHead = () => {
  const { selectedService } = useServices();
  const { isEligibleForRewards } = useRewardContext();
  const status = selectedService?.deploymentStatus;

  if (
    status === MiddlewareDeploymentStatus.DEPLOYING ||
    status === MiddlewareDeploymentStatus.STOPPING
  ) {
    return <TransitionalAgentHead />;
  }

  if (status === MiddlewareDeploymentStatus.DEPLOYED) {
    // If the agent is eligible for rewards, agent is idle
    return isEligibleForRewards ? <IdleAgentHead /> : <DeployedAgentHead />;
  }
  return <StoppedAgentHead />;
};

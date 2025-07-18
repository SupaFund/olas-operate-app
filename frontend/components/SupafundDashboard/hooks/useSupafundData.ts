import { useEffect, useState } from 'react';

interface Metrics {
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  activePositions: number;
  winRate: number;
  weeklyPerformance: number;
  monthlyPerformance: number;
}

interface Opportunity {
  id: string;
  title: string;
  edge: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  direction: 'YES' | 'NO';
  category: string;
  expiresIn: string;
}

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

interface Activity {
  id: string;
  type: 'POSITION_OPENED' | 'POSITION_CLOSED' | 'MARKET_ANALYSIS';
  title: string;
  description: string;
  timestamp: string;
  result?: {
    pnl?: number;
    confidence?: string;
  };
}

export const useSupafundData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metrics>({
    totalProfitLoss: 0,
    totalProfitLossPercentage: 0,
    activePositions: 0,
    winRate: 0,
    weeklyPerformance: 0,
    monthlyPerformance: 0,
  });
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Mock data for demonstration
  const loadMockData = () => {
    setMetrics({
      totalProfitLoss: 1250.5,
      totalProfitLossPercentage: 12.5,
      activePositions: 3,
      winRate: 68.5,
      weeklyPerformance: 5.2,
      monthlyPerformance: 15.8,
    });

    setOpportunities([
      {
        id: '1',
        title: 'Will Worldcoin reach 100M users by Q2 2025?',
        edge: 15,
        confidence: 'HIGH',
        direction: 'YES',
        category: 'User Growth',
        expiresIn: '2 days',
      },
      {
        id: '2',
        title: 'Will Farcaster protocol integrate with Lens?',
        edge: 8,
        confidence: 'MEDIUM',
        direction: 'NO',
        category: 'Integration',
        expiresIn: '5 days',
      },
      {
        id: '3',
        title: 'Will zkSync Era TVL exceed $1B?',
        edge: 12,
        confidence: 'HIGH',
        direction: 'YES',
        category: 'DeFi',
        expiresIn: '1 week',
      },
    ]);

    setPositions([
      {
        id: '1',
        market: 'Will Optimism token reach $5?',
        direction: 'YES',
        entryPrice: 0.45,
        currentPrice: 0.52,
        size: 1000,
        pnl: 70,
        pnlPercentage: 15.56,
        timeRemaining: '3 days',
        status: 'OPEN',
      },
      {
        id: '2',
        market: 'Will Base network reach 1M daily transactions?',
        direction: 'YES',
        entryPrice: 0.3,
        currentPrice: 0.28,
        size: 500,
        pnl: -10,
        pnlPercentage: -6.67,
        timeRemaining: '5 days',
        status: 'OPEN',
      },
    ]);

    setActivities([
      {
        id: '1',
        type: 'POSITION_OPENED',
        title: 'Opened position on Optimism price',
        description: 'Bought YES shares at $0.45 based on technical analysis',
        timestamp: '2 hours ago',
      },
      {
        id: '2',
        type: 'MARKET_ANALYSIS',
        title: 'Analyzed Base network growth',
        description: 'High confidence in transaction volume increase',
        timestamp: '4 hours ago',
        result: {
          confidence: 'HIGH',
        },
      },
      {
        id: '3',
        type: 'POSITION_CLOSED',
        title: 'Closed position on Arbitrum TVL',
        description: 'Sold YES shares at profit',
        timestamp: '1 day ago',
        result: {
          pnl: 150.25,
        },
      },
    ]);

    setIsLoading(false);
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      loadMockData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadMockData();
    }, 500);
  };

  return {
    metrics,
    opportunities,
    positions,
    activities,
    isLoading,
    refetch,
  };
};

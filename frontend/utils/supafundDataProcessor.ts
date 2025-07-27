import { TradeData, MarketData, UserPosition } from './supafundSubgraph';

export interface ProcessedMetrics {
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  activePositions: number;
  winRate: number;
  weeklyPerformance: number;
  monthlyPerformance: number;
}

export interface ProcessedOpportunity {
  id: string;
  title: string;
  edge: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  direction: 'YES' | 'NO';
  category: string;
  expiresIn: string;
}

export interface ProcessedPosition {
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

export interface ProcessedActivity {
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

// 计算交易盈亏
const calculateTradePnL = (trade: TradeData): number => {
  try {
    const collateralAmount = parseFloat(trade.collateralAmount) / 1e18; // Wei to ETH
    const feeAmount = parseFloat(trade.feeAmount) / 1e18;
    // 由于 schema 不匹配，使用模拟价格计算
    const outcomeTokenPrice = 0.45 + Math.random() * 0.1; // 0.45-0.55 之间的随机价格
    
    // 简化的盈亏计算 - 基于结果价格和投资金额
    if (trade.type === 'Buy') {
      // 买入时，如果价格上涨则盈利
      return (outcomeTokenPrice - 0.5) * collateralAmount - feeAmount;
    } else {
      // 卖出时，如果价格下跌则盈利  
      return (0.5 - outcomeTokenPrice) * collateralAmount - feeAmount;
    }
  } catch (error) {
    console.error('Error calculating PnL for trade:', trade.id, error);
    return 0;
  }
};

// 计算时间差
const getTimeAgo = (timestamp: string): string => {
  const now = Date.now();
  const time = parseInt(timestamp) * 1000;
  const diffSeconds = Math.floor((now - time) / 1000);
  
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
  return `${Math.floor(diffSeconds / 86400)}d ago`;
};

// 计算指标
export const calculateMetricsFromTrades = (trades: TradeData[]): ProcessedMetrics => {
  if (!trades || trades.length === 0) {
    return {
      totalProfitLoss: 0,
      totalProfitLossPercentage: 0,
      activePositions: 0,
      winRate: 0,
      weeklyPerformance: 0,
      monthlyPerformance: 0,
    };
  }

  let totalPnL = 0;
  let wins = 0;
  let totalTrades = 0;
  let weeklyPnL = 0;
  let monthlyPnL = 0;
  
  const now = Date.now() / 1000;
  const weekAgo = now - 7 * 24 * 60 * 60;
  const monthAgo = now - 30 * 24 * 60 * 60;

  trades.forEach((trade) => {
    const pnl = calculateTradePnL(trade);
    const tradeTime = parseInt(trade.creationTimestamp);
    
    totalPnL += pnl;
    totalTrades++;
    
    if (pnl > 0) wins++;
    
    if (tradeTime >= weekAgo) weeklyPnL += pnl;
    if (tradeTime >= monthAgo) monthlyPnL += pnl;
  });

  const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
  
  // 假设初始投资为总交易量的平均值
  const avgTradeSize = trades.length > 0 
    ? trades.reduce((sum, t) => sum + parseFloat(t.collateralAmount) / 1e18, 0) / trades.length 
    : 1000;
  const initialInvestment = avgTradeSize * 20; // 假设

  return {
    totalProfitLoss: totalPnL,
    totalProfitLossPercentage: initialInvestment > 0 ? (totalPnL / initialInvestment) * 100 : 0,
    activePositions: trades.filter(t => !t.fpmm.resolutionTimestamp).length,
    winRate,
    weeklyPerformance: initialInvestment > 0 ? (weeklyPnL / initialInvestment) * 100 : 0,
    monthlyPerformance: initialInvestment > 0 ? (monthlyPnL / initialInvestment) * 100 : 0,
  };
};

// 处理市场机会
export const processMarketOpportunities = (markets: MarketData[]): ProcessedOpportunity[] => {
  return markets.slice(0, 10).map((market, index) => {
    // 简化的边际计算
    const edge = Math.random() * 20 + 5; // 5-25%
    const confidence = edge > 15 ? 'HIGH' : edge > 10 ? 'MEDIUM' : 'LOW';
    const direction = Math.random() > 0.5 ? 'YES' : 'NO';
    
    // 计算到期时间
    const creationTime = parseInt(market.creationTimestamp);
    const estimatedExpiry = creationTime + (30 * 24 * 60 * 60); // 假设30天后到期
    const timeLeft = estimatedExpiry - Date.now() / 1000;
    const daysLeft = Math.max(1, Math.floor(timeLeft / (24 * 60 * 60)));
    
    return {
      id: market.id,
      title: market.title.length > 60 ? market.title.substring(0, 60) + '...' : market.title,
      edge: Math.round(edge),
      confidence,
      direction,
      category: market.question?.category || 'General',
      expiresIn: daysLeft > 1 ? `${daysLeft} days` : 'Soon',
    };
  });
};

// 处理当前仓位
export const processUserPositions = (positions: UserPosition[], trades: TradeData[]): ProcessedPosition[] => {
  return positions.map((position, index) => {
    const balance = parseFloat(position.balance) / 1e18;
    const entryPrice = 0.4 + Math.random() * 0.2; // 模拟进入价格 (0.4-0.6)
    const currentPrice = 0.4 + Math.random() * 0.2; // 模拟当前价格
    
    const pnl = (currentPrice - entryPrice) * balance;
    const pnlPercentage = entryPrice > 0 ? (pnl / (entryPrice * balance)) * 100 : 0;
    
    return {
      id: position.id,
      market: `Position ${index + 1} - Condition ${position.position.conditionIds[0]?.substring(0, 8) || 'Unknown'}...`,
      direction: Math.random() > 0.5 ? 'YES' : 'NO',
      entryPrice: Math.round(entryPrice * 100) / 100,
      currentPrice: Math.round(currentPrice * 100) / 100,
      size: Math.round(balance * 100) / 100,
      pnl: Math.round(pnl * 100) / 100,
      pnlPercentage: Math.round(pnlPercentage * 100) / 100,
      timeRemaining: `${Math.floor(Math.random() * 30) + 1} days`,
      status: 'OPEN' as const,
    };
  });
};

// 处理活动历史
export const processTradeActivities = (trades: TradeData[]): ProcessedActivity[] => {
  return trades.slice(0, 20).map((trade) => {
    const pnl = calculateTradePnL(trade);
    const isPositionClosed = trade.fpmm.resolutionTimestamp;
    
    return {
      id: trade.id,
      type: isPositionClosed ? 'POSITION_CLOSED' : 'POSITION_OPENED',
      title: isPositionClosed ? 'Closed position' : 'Opened position',
      description: `${trade.type} ${trade.title.substring(0, 50)}${trade.title.length > 50 ? '...' : ''}`,
      timestamp: getTimeAgo(trade.creationTimestamp),
      result: {
        pnl: isPositionClosed ? Math.round(pnl * 100) / 100 : undefined,
      },
    };
  });
};
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import React from 'react';

const { Title, Text } = Typography;

interface Opportunity {
  id: string;
  title: string;
  edge: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  direction: 'YES' | 'NO';
  category: string;
  expiresIn: string;
}

interface OpportunitiesTabProps {
  opportunities: Opportunity[];
}

const getConfidenceColor = (confidence: string) => {
  switch (confidence) {
    case 'HIGH':
      return 'success';
    case 'MEDIUM':
      return 'warning';
    case 'LOW':
      return 'default';
    default:
      return 'default';
  }
};

const getDirectionColor = (direction: string) => {
  return direction === 'YES' ? 'green' : 'red';
};

export const OpportunitiesTab: React.FC<OpportunitiesTabProps> = ({
  opportunities,
}) => {
  if (opportunities.length === 0) {
    return (
      <Empty
        description="No opportunities available at the moment"
        style={{ padding: '40px 0' }}
      />
    );
  }

  return (
    <Row gutter={[12, 12]}>
      {opportunities.map((opportunity) => (
        <Col xs={24} key={opportunity.id}>
          <Card
            hoverable
            size="small"
            style={{ width: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Header with edge badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Title 
                  level={5} 
                  style={{ margin: 0, fontSize: '14px', flex: 1, marginRight: '8px' }}
                  ellipsis={{ rows: 2, tooltip: opportunity.title }}
                >
                  {opportunity.title}
                </Title>
                <Tag color={opportunity.edge > 10 ? 'green' : 'blue'} style={{ margin: 0, fontSize: '11px' }}>
                  {opportunity.edge}% Edge
                </Tag>
              </div>
              
              {/* Tags and category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  <Tag color={getDirectionColor(opportunity.direction)} style={{ margin: 0, fontSize: '11px' }}>
                    {opportunity.direction}
                  </Tag>
                  <Tag color={getConfidenceColor(opportunity.confidence)} style={{ margin: 0, fontSize: '11px' }}>
                    {opportunity.confidence}
                  </Tag>
                </div>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  {opportunity.category}
                </Text>
              </div>
              
              {/* Footer with expiry and action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  Expires in {opportunity.expiresIn}
                </Text>
                <Button type="link" icon={<InfoCircleOutlined />} size="small" style={{ padding: '0 4px', fontSize: '11px' }}>
                  View
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

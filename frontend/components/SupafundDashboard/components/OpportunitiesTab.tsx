import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Empty,
  Row,
  Tag,
  Typography,
} from 'antd';
import React from 'react';

const { Title, Text } = Typography;

interface Opportunity {
  id: string;
  title: string;
  marketLeader: string; // e.g., "73% YES" or "51% NO"
  category: string;
  expiresIn: string;
}

interface OpportunitiesTabProps {
  opportunities: Opportunity[];
}


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
              {/* Header with market leader badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Title 
                  level={5} 
                  style={{ margin: 0, fontSize: '14px', flex: 1, marginRight: '8px' }}
                  ellipsis={{ rows: 2, tooltip: opportunity.title }}
                >
                  {opportunity.title}
                </Title>
                <Tag 
                  color={
                    opportunity.marketLeader.includes('%') ? (
                      opportunity.marketLeader.includes('YES') ? 'green' : 'red'
                    ) : 'blue'
                  }
                  style={{ margin: 0, fontSize: '11px' }}
                >
                  {opportunity.marketLeader}
                </Tag>
              </div>
              
              {/* Category only */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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

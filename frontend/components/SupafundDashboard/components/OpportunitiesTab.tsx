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
    <Row gutter={[16, 16]}>
      {opportunities.map((opportunity) => (
        <Col xs={24} sm={12} md={8} key={opportunity.id}>
          <Card
            hoverable
            style={{ height: '100%' }}
            actions={[
              <Button type="link" icon={<InfoCircleOutlined />} key="analyze">
                View Analysis
              </Button>,
            ]}
          >
            <Badge.Ribbon
              text={`${opportunity.edge}% Edge`}
              color={opportunity.edge > 10 ? 'green' : 'blue'}
            >
              <div style={{ paddingRight: '20px' }}>
                <Title level={5} ellipsis={{ rows: 2 }}>
                  {opportunity.title}
                </Title>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: '100%' }}
                >
                  <div>
                    <Tag color={getDirectionColor(opportunity.direction)}>
                      {opportunity.direction}
                    </Tag>
                    <Tag color={getConfidenceColor(opportunity.confidence)}>
                      {opportunity.confidence} Confidence
                    </Tag>
                  </div>
                  <Text type="secondary">{opportunity.category}</Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Expires in {opportunity.expiresIn}
                  </Text>
                </Space>
              </div>
            </Badge.Ribbon>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

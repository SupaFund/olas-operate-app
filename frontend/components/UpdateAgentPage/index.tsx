import { ConfigProvider } from 'antd';

import { AgentType } from '@/enums/Agent';
import { useServices } from '@/hooks/useServices';
import { LOCAL_FORM_THEME } from '@/theme';

import { AgentsFunUpdateSetup } from './AgentsFunUpdateSetup';
import { UpdateAgentProvider } from './context/UpdateAgentProvider';
import { ModiusUpdatePage } from './ModiusUpdateForm';
import { OptimusUpdatePage } from './OptimusUpdateForm';
import { SupafundUpdateSetup } from './SupafundUpdateSetup';

export const UpdateAgentPage = () => {
  const { selectedAgentType } = useServices();
  return (
    <UpdateAgentProvider>
      <ConfigProvider theme={LOCAL_FORM_THEME}>
        {selectedAgentType === AgentType.AgentsFun && <AgentsFunUpdateSetup />}
        {selectedAgentType === AgentType.Modius && <ModiusUpdatePage />}
        {selectedAgentType === AgentType.Optimus && <OptimusUpdatePage />}
        {selectedAgentType === AgentType.Supafund && <SupafundUpdateSetup />}
      </ConfigProvider>
    </UpdateAgentProvider>
  );
};

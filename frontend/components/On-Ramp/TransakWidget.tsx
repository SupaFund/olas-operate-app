import { Transak } from '@transak/transak-sdk';
import { Flex, Spin } from 'antd';
import { useEffect, useState } from 'react';

import { useElectronApi } from '@/hooks/useElectronApi';
/**
 * https://docs.transak.com/docs/transak-sdk
 */
const TransakWidget = () => {
  const { transakWindow } = useElectronApi();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const transak = new Transak({
      apiKey: `${process.env.TRANSAK_API_KEY}`,
      environment: Transak.ENVIRONMENTS.STAGING, // or 'PRODUCTION'
      widgetHeight: '100%',
      widgetWidth: '100%',
      paymentMethod: 'credit_debit_card',
      fiatCurrency: 'USD',
      // dynamic fields, should get from query parameters
      fiatAmount: 0.5,
      cryptoCurrencyCode: 'ETH',
      network: 'optimism',
      walletAddress: '0x333Dd90d00C8A46Dde6a0e59569A9a8C25a9E2F4',
    });

    transak.init();

    // To get all the events
    Transak.on('*', (data) => {
      console.log(data);
    });

    // This will trigger when the user closed the widget
    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      console.log('Transak SDK closed!');
      transakWindow?.close?.();
    });

    // This will trigger when the widget is loaded
    Transak.on(Transak.EVENTS.TRANSAK_WIDGET_INITIALISED, () => {
      console.log('Transak is loaded!');
      setIsLoading(false);
    });

    /*
     * This will trigger when the user has confirmed the order
     * This doesn't guarantee that payment has completed in all scenarios
     * If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
     */
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
      console.log(orderData);
    });

    /*
     * This will trigger when the user marks payment is made
     * You can close/navigate away at this event
     */
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });

    return () => transak.close();
  }, [transakWindow]);

  return (
    <>
      <Flex justify="center" align="center" style={{ height: 700 }}>
        <div id="transak-container" />
        {isLoading && <Spin />}
      </Flex>
    </>
  );
};

export default TransakWidget;

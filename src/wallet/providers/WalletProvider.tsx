import React from 'react';
import { PhantomProvider } from '@phantom/react-sdk';
import { AddressType } from '@phantom/react-sdk';

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <PhantomProvider
      config={{
        providerType: "injected",
        addressTypes: [AddressType.solana],
        autoConnect: true, // Auto-connect when page loads
      }}
      children={children}
    />
  );
};
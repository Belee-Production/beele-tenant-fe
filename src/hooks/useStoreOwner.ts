import { StoreOwnerContext } from '@/context';
import { useContext } from 'react';

export const useStoreOwner = () => {
  const context = useContext(StoreOwnerContext);
  if (context === undefined) {
    throw new Error('useStoreOwner harus digunakan dalam StoreProfileProvider');
  }
  return context;
};

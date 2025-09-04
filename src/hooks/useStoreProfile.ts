import { StoreProfileContext } from '@/context';
import { useContext } from 'react';

export const useStoreProfile = () => {
  const context = useContext(StoreProfileContext);
  if (context === undefined) {
    throw new Error('useStoreProfile harus digunakan dalam StoreProfileProvider');
  }
  return context;
};

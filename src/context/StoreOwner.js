import { createContext } from 'react';

const StoreOwnerContext = createContext({
  data: null,
  isLoading: false,
  isSuccess: false,
  message: null,
  totalData: null,
  refetch: () => {}
});

export default StoreOwnerContext;

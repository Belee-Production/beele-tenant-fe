import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAuth, usePagination, useService } from '@/hooks';
import { StoreOwnerService } from '@/services';
import { StoreOwnerContext } from '@/context';

export default function OwnerStoreProvider({ children }) {
  const { token } = useAuth();
  const { execute, data, isLoading, isSuccess, message, totalData } = useService(StoreOwnerService.getAll);
  const pagination = usePagination({ totalData: totalData });

  const fetchStoreOwner = useCallback(() => {
    if (token) {
      execute({ token: token, page: pagination.page, per_page: pagination.perPage });
    }
  }, [execute, pagination.page, pagination.perPage, token]);

  useEffect(() => {
    fetchStoreOwner();
  }, [fetchStoreOwner]);

  const value = {
    data,
    isLoading,
    isSuccess,
    message,
    refetch: fetchStoreOwner
  };

  return <StoreOwnerContext.Provider value={value}>{children}</StoreOwnerContext.Provider>;
}

OwnerStoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};

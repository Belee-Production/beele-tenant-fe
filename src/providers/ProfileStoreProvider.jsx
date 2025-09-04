import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAuth, usePagination, useService } from '@/hooks';
import { StoreProfileService } from '@/services';
import { StoreProfileContext } from '@/context';

export default function ProfileStoreProvider({ children }) {
  const { token } = useAuth();
  const { execute, data, isLoading, isSuccess, message, totalData } = useService(StoreProfileService.getAll);
  const pagination = usePagination({ totalData: totalData });

  const fetchStoreProfile = useCallback(() => {
    if (token) {
      execute({ token: token, page: pagination.page, per_page: pagination.perPage });
    }
  }, [execute, pagination.page, pagination.perPage, token]);

  useEffect(() => {
    fetchStoreProfile();
  }, [fetchStoreProfile]);

  const value = {
    data,
    isLoading,
    isSuccess,
    message,
    refetch: fetchStoreProfile
  };

  return <StoreProfileContext.Provider value={value}>{children}</StoreProfileContext.Provider>;
}

ProfileStoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};

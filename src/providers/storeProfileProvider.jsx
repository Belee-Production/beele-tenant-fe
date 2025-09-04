import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAuth, useService } from '@/hooks';
import { StoreProfileService } from '@/services';
import { StoreProfileContext } from '@/context';

export default function StoreProfileProvider({ children }) {
  const { token } = useAuth();
  const { execute, ...getAllStoreProfile } = useService(StoreProfileService.getAll);

  const fetchStoreProfile = useCallback(() => {
    if (token) {
      execute({ token: token });
    }
  }, [execute, token]);

  useEffect(() => {
    fetchStoreProfile();
  }, [fetchStoreProfile]);

  const value = {
    ...getAllStoreProfile,
    refetch: fetchStoreProfile
  };

  return <StoreProfileContext.Provider value={value}>{children}</StoreProfileContext.Provider>;
}

StoreProfileProvider.propTypes = {
  children: PropTypes.node.isRequired
};

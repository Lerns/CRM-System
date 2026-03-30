import { useAppSelector } from '../store/hooks';
import {
  selectCanModerate,
  selectHasRole,
  selectIsAdmin,
  selectIsModerator,
} from '../store/auth/selectors';
import { Roles } from '../types/typesUsers';

export function usePermissions() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const isModerator = useAppSelector(selectIsModerator);
  const canModerate = useAppSelector(selectCanModerate);
  return {
    isAdmin,
    isModerator,
    canModerate,
    hasRole: (role: Roles) => useAppSelector(selectHasRole(role)),
  };
}

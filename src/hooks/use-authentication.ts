import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { getUserinfo, loginWithTaraJwt } from '../slices/authentication-slice';
import useAuthenticationSelector from './use-authentication-selector';
import authRedirectionService from '../services/auth-redirection-service';

const useAuthentication = (): void => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, fetchingUserInfo, loggedInWithTaraJwt } = useAuthenticationSelector();

  useEffect(() => {
   authRedirectionService.redirectIfComeBackFromTim()
    
    if (!isAuthenticated || loggedInWithTaraJwt) {
      dispatch(getUserinfo());
    }
  }, [isAuthenticated, loggedInWithTaraJwt]);

  useEffect(() => {
    if (!isAuthenticated && !fetchingUserInfo) {
      dispatch(loginWithTaraJwt());
    }
  }, [isAuthenticated, fetchingUserInfo]);
};

export default useAuthentication;

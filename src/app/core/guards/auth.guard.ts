import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js'; // Add this import

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {

  const { authenticated, grantedRoles } = authData;

  const requiredRoles = route.data['role'];
  if (requiredRoles.length === 0) {
    return true;
  }

  const hasRequiredRole = (_requiredRoles: string[]): boolean => {
    const resourceRoles: boolean = Object.values(grantedRoles.resourceRoles).some((granted_roles) => _requiredRoles.some((_requiredRole) => granted_roles.includes(_requiredRole)));
    const realmRoles: boolean = Object.values(grantedRoles.realmRoles).some((granted_roles) => _requiredRoles.some((_requiredRole) => granted_roles.includes(_requiredRole)));
    return resourceRoles || realmRoles;
  };

  if (authenticated && hasRequiredRole(requiredRoles)) {
    const keycloak = inject(Keycloak);
    if (keycloak.refreshToken) {
      await keycloak.updateToken(300);
    }
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['/unauthorised'], {
    queryParams: { returnUrl: __.url }
  });
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
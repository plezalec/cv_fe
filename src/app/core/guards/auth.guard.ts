import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

/**
 * The logic below is a simple example, please make it more robust when implementing in your application.
 *
 * Reason: isAccessGranted is not validating the resource, since it is merging all roles. Two resources might
 * have the same role name and it makes sense to validate it more granular.
 */
const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRoles = route.data['role'];
  if (!requiredRoles || requiredRoles.length === 0) {
    return false;
  }

  const hasRequiredRole = (_requiredRoles: string[]): boolean => {
    const resourceRoles: boolean = Object.values(grantedRoles.resourceRoles).some((granted_roles) => _requiredRoles.some((_requiredRole) => granted_roles.includes(_requiredRole)));
    const realmRoles: boolean = Object.values(grantedRoles.realmRoles).some((granted_roles) => _requiredRoles.some((_requiredRole) => granted_roles.includes(_requiredRole)));
    return resourceRoles || realmRoles;
  };

  if (authenticated && hasRequiredRole(requiredRoles)) {
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['/unauthorised'], {
    queryParams: { returnUrl: __.url }
  });
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
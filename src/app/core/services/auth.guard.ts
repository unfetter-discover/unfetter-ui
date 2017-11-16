import { Injectable } from '@angular/core';
import { 
    Router, 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}   

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const requiredRoles = route.data['ROLES'];

        if (requiredRoles !== undefined && requiredRoles.length) {

            if (this.authService.loggedIn() && this.authService.hasRole(requiredRoles)) {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }

        // No specific role is required
        } else {

            if (this.authService.loggedIn()) {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }

        }             
    }
}

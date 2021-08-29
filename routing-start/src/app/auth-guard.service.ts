import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, 
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().then(
            (authenticated: boolean) =>{
                if(authenticated){
                    return true;
                } else {
                    this.router.navigate(['/']);
                }
            }
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
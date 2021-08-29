import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";

import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
    canComponentDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentStatus: RouterStateSnapshot,
        nextStatus?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canComponentDeactivate();
    }
}


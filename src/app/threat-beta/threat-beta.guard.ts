import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppState } from '../root-store/app.reducers';
import { UserProfile } from '../models/user/user-profile';
import { catchError, take, pluck, switchMap, map } from 'rxjs/operators';
import { ThreatBoard } from 'stix/unfetter/threat-board';

@Injectable({
  providedIn: 'root'
})
export class ThreatBetaGuard implements CanActivate {

  public readonly demoMode: boolean = (environment.runMode === 'DEMO');
  private readonly BASE_URL = 'threat-beta';
  private readonly CREATE_URL = `${this.BASE_URL}/create`;

  constructor(
    private router: Router,
    public store: Store<AppState>,
    // public threatService: ThreatService,

  ) { }

  /**
   * @description
   * @param next
   * @param state 
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('users').pipe(
      take(1),
      pluck('userProfile'),
      switchMap((user: UserProfile) => {
        const o$: Observable<Partial<ThreatBoard>[]> = observableOf([]); // this.threatService.getLatestThreatBoard();
        return o$.pipe(
          map((data) => {
            if (data === undefined || data.length === 0) {
              // no threat boards found, navigate to creation page
              this.router.navigate([this.CREATE_URL]);
              return false;
            } else {
              // has threat boards,
              // navigate to the last modified
              const lastModThreatBoard = data[0];
              this.router.navigate([`/${this.BASE_URL}/feed`, lastModThreatBoard.id]);
              return true;
            }
          }),
          catchError((err) => {
            console.log('error in route guard, routing to create page', err);
            this.router.navigate([this.CREATE_URL]);
            return observableOf(false);
          }));
      }));


  }
}

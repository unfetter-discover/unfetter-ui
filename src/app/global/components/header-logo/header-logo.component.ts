import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../root-store/app.reducers';
import { getTheme } from '../../../root-store/utility/utility.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss']
})
export class HeaderLogoComponent {

  @Input() public title: string;
  public themeClass$;

  constructor(private store: Store<AppState>) { 
    this.themeClass$ = this.store.select(getTheme)
      .pipe(
        map((theme) => `${theme}Accent`)
      );
  }
}

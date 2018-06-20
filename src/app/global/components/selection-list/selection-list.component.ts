import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';

@Component({
  selector: 'unf-selection-list',
  templateUrl: './selection-list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {

  @Input()
  public stix: any[];

  @Input()
  public formCtrl: FormControl;

  public filterCtrl: FormControl = new FormControl('');
  public searchTerm: string = '';
  public displayArr: boolean[];

  public ngOnInit() {
    
    const filter$ = this.filterCtrl.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        finalize(() => filter$ && filter$.unsubcribe())
      )
      .subscribe(
        (term) => {
          this.searchTerm = term.toUpperCase();
          this.initDisplayArr();
          this.stix.forEach((stix, i) => {
            if (stix.name.toUpperCase().indexOf(this.searchTerm) > -1) {
              this.displayArr[i] = true;
            } else {
              this.displayArr[i] = false;
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  private initDisplayArr() {
    if (!this.displayArr || (this.displayArr.length && this.displayArr.length !== this.stix.length)) {
      this.displayArr = this.stix.map(() => true);
    }
  }
}

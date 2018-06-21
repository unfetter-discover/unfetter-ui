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

  @Input()
  public showSelectedOnly: boolean = false;

  @Input()
  public listMaxHeight: string = '392px';

  public filterCtrl: FormControl = new FormControl('');
  public searchTerm: string = '';
  public hideStixObj = {};

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
          this.hideObjs();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public hideObjs() {
    if (this.showSelectedOnly) {
      this.stix.forEach((stix, i) => {
        if (this.formCtrl.value.includes(stix.id) && (this.searchTerm === '' || stix.name.toUpperCase().indexOf(this.searchTerm) > -1)) {
          this.hideStixObj[stix.id] = false;
        } else {
          this.hideStixObj[stix.id] = true;
        }
      });
    } else {      
      this.stix.forEach((stix, i) => {
        if (this.searchTerm === '' || stix.name.toUpperCase().indexOf(this.searchTerm) > -1) {
          this.hideStixObj[stix.id] = false;
        } else {
          this.hideStixObj[stix.id] = true;
        }
      });
    }
  }
}

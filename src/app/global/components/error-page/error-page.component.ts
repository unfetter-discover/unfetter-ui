import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpStatusCodes, HttpErrorMessages } from '../../enums/http-status-codes.enum';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  public defaultCode: HttpStatusCodes = 520;
  public statusCode: HttpStatusCodes = this.defaultCode;
  public errorTitle: string = HttpErrorMessages[this.statusCode].title;
  public errorMessage: string = HttpErrorMessages[this.statusCode].message;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const getParam$ = this.route.params
      .pipe(
        finalize((() => getParam$ && getParam$.unsubscribe()))
      )
      .subscribe(
        (params) => {
          const { code } = params;
          if (code) {
            this.statusCode = code;
          } else {
            this.statusCode = this.defaultCode;
          }
          this.errorTitle = HttpErrorMessages[this.statusCode].title;
          this.errorMessage = HttpErrorMessages[this.statusCode].message;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

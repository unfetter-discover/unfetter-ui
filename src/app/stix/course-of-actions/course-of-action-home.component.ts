import { Component, OnInit } from '@angular/core';
import { CourseOfActionService } from './course-of-action.service';

@Component({
  selector: 'course-of-action-home',
  templateUrl: './course-of-action-home.component.html',
})
export class CourseOfActionHomeComponent implements OnInit {
    private pageTitle = 'Courses Of Action';
    private pageIcon = 'assets/icon/stix-icons/svg/course-of-action-b.svg';

    constructor() {
        console.log('Initial CourseOfActionHomeComponent');
    }
    public ngOnInit() {
        console.log('Initial CourseOfActionHomeComponent');
    }
}

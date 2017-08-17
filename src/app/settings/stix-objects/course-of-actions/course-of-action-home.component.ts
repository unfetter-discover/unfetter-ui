import { Component, OnInit } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'course-of-action-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class CourseOfActionHomeComponent {
    private pageTitle = 'Courses Of Action';
    private pageIcon = Constance.COURSE_OF_ACTION_ICON;
    private description = 'A Course of Action is an action taken to prevent an attack or respond to an attack that is in progress.  ' +
            'It could be described as a Critical Control or Mitigation.  It could be technical, automatable responses or analytical, but it ' +
             'could also represent higher level actions like employee training or penetration testing.  For example, a Course Of Action to apply ' +
            'Security Patches could prevent Vulnerability Exploitation';
}

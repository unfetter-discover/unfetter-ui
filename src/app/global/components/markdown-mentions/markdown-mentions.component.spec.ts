import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule } from 'ngx-markdown';

import { MarkdownMentionsComponent } from './markdown-mentions.component';
import { reducers } from '../../../root-store/app.reducers';
import { SetUserList } from '../../../root-store/users/user.actions';
import { take } from 'rxjs/operators';
import { UserListItem } from '../../../models/user/user-profile';

describe('MarkdownMentionsComponent', () => {
  let component: MarkdownMentionsComponent;
  let fixture: ComponentFixture<MarkdownMentionsComponent>;

  const mockUsers: UserListItem[] = [
    {
      _id: '1234',
      firstName: 'test',
      lastName: 'user',
      userName: 'testuser',
      avatar_url: 'testuser.com/testuser.jpg'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownMentionsComponent ],
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        MarkdownModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownMentionsComponent);
    component = fixture.componentInstance;
    component['store'].dispatch(new SetUserList(mockUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mention of users in user list', fakeAsync((done) => {
    component.markDown = `@${mockUsers[0].userName}`;
    const expected = `<a data-link="${mockUsers[0]._id}">@${mockUsers[0].userName}</a>`;
    fixture.detectChanges();
    tick(50);
    expect(component['_markDown']).toBe(expected);
  }));

  it('should NOT render mention of users NOT in user list', fakeAsync((done) => {
    component.markDown = '@fakeuser';
    const expected = '@fakeuser';
    fixture.detectChanges();
    tick(50);
    expect(component['_markDown']).toBe(expected);
  }));
});

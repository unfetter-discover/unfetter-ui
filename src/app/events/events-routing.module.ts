import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
      path: '',
      component: EventsLayoutComponent,
      children: [
        {path: '', component: EventsComponent, }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsComponent } from './events/events.component';
import { GlobalModule } from '../global/global.module';
import { EventsContentComponent } from './events-content/events-content.component';
import { RelatedComponent } from './related/related.component';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    GlobalModule
  ],
  declarations: [EventsLayoutComponent, EventsComponent, EventsContentComponent, RelatedComponent, FiltersComponent]
})
export class EventsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsComponent } from './events/events.component';
import { GlobalModule } from '../global/global.module';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    GlobalModule
  ],
  declarations: [EventsLayoutComponent, EventsComponent]
})
export class EventsModule { }
